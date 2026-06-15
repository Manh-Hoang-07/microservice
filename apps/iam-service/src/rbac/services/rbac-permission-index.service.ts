import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { RbacRepository } from '../repositories/rbac.repository';
import { PERM } from '../constants/rbac.constants';

type PermissionNode = { code: string; parentCode: string | null };

@Injectable()
export class RbacPermissionIndexService implements OnModuleInit, OnModuleDestroy {
  private permissionByCode = new Map<string, PermissionNode>();
  // Precomputed: code → tap moi hau due (con chau) cua no. Build 1 lan cung
  // permissionByCode. Ngu nghia khop `grants()`: neu C nam tren ancestor-chain
  // cua D thi C grant D → D thuoc descendantsByCode.get(C). Dung trong
  // expandAssigned de tranh O(N×depth) walk moi lan goi.
  private descendantsByCode = new Map<string, Set<string>>();
  private lastPermFetchMs = 0;
  private readonly permIndexTtlMs = 24 * 60 * 60 * 1000;
  private readonly prewarmIntervalMs = 6 * 60 * 60 * 1000;
  private readonly permIndexRefreshChannel = 'rbac:perm_index_refresh';
  private permissionIndexRefreshInFlight: Promise<void> | null = null;
  private prewarmTimer: NodeJS.Timeout | null = null;
  // Persisted reference to the subscriber callback so onModuleDestroy can
  // detach it via redis.unsubscribe(). Without this, the closure retains
  // `this` and prevents GC of the IAM service during hot-reload.
  private subscriberCallback: ((message: string) => void) | null = null;

  constructor(
    private readonly rbacRepo: RbacRepository,
    private readonly redis: RedisService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.ensurePermissionIndexes().catch(() => undefined);
    if (this.redis.isEnabled()) {
      this.subscriberCallback = (_message) => {
        void this.refreshNow().catch(() => undefined);
      };
      await this.redis.subscribe(this.permIndexRefreshChannel, this.subscriberCallback);
    }
    this.prewarmTimer = setInterval(() => {
      void this.ensurePermissionIndexes().catch(() => undefined);
    }, this.prewarmIntervalMs);
    // Don't keep the event loop alive solely for the prewarm timer.
    this.prewarmTimer.unref?.();
  }

  /** Publish a permission-index refresh — call after creating/updating/deleting permissions or roles. */
  async publishRefresh(): Promise<void> {
    await this.refreshNow();
    if (this.redis.isEnabled()) {
      await this.redis
        .publish(this.permIndexRefreshChannel, JSON.stringify({ at: Date.now() }))
        .catch(() => undefined);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.prewarmTimer) {
      clearInterval(this.prewarmTimer);
      this.prewarmTimer = null;
    }
    if (this.subscriberCallback) {
      // Detach so the closure doesn't pin `this` past module destruction.
      await this.redis
        .unsubscribe(this.permIndexRefreshChannel, this.subscriberCallback)
        .catch(() => undefined);
      this.subscriberCallback = null;
    }
  }

  async prepare(): Promise<void> {
    await this.ensurePermissionIndexes();
  }

  async refreshNow(): Promise<void> {
    this.lastPermFetchMs = 0;
    await this.ensurePermissionIndexes(true);
  }

  matchesAssigned(assignedCodes: Set<string>, need: string): boolean {
    return this.grants(need, (code) => assignedCodes.has(code));
  }

  hasAnyRequiredFromAssigned(assignedCodes: Set<string>, required: string[]): boolean {
    return required.some((need) => this.matchesAssigned(assignedCodes, need));
  }

  /**
   * Walk the permission hierarchy DOWN: given the set of codes a user
   * directly holds, return every code that user implicitly has by
   * permission inheritance (each child grants when an ancestor is held).
   *
   * Used by `/internal/rbac/effective` so that guards can cache one set
   * per user and evaluate locally with a single `Set.has(needed)`
   * instead of round-tripping IAM for every distinct permission tuple.
   */
  expandAssigned(assignedCodes: Set<string>): Set<string> {
    // system.manage shortcut: every active permission is implicitly granted.
    if (assignedCodes.has(PERM.SYSTEM.MANAGE)) {
      return new Set(this.permissionByCode.keys());
    }
    // O(so code user giu): moi assigned code → union truoc tap hau due da precompute.
    const expanded = new Set(assignedCodes);
    for (const code of assignedCodes) {
      const descendants = this.descendantsByCode.get(code);
      if (descendants) {
        for (const d of descendants) expanded.add(d);
      }
    }
    return expanded;
  }

  /**
   * Build descendantsByCode tu permissionByCode. Voi moi node, di NGUOC len
   * theo parentCode (giong vong lap trong `grants()`, ke ca cycle-guard) va
   * ghi node do vao descendant-set cua tung ancestor. Ket qua: ancestor → tap
   * tat ca con chau — khop dung ngu nghia "ancestor grants descendant".
   */
  private buildDescendants(byCode: Map<string, PermissionNode>): Map<string, Set<string>> {
    const descendants = new Map<string, Set<string>>();
    for (const node of byCode.values()) {
      const visited = new Set<string>();
      for (let cur = node; cur?.parentCode; ) {
        if (visited.has(cur.parentCode)) break;
        visited.add(cur.parentCode);
        const parent = byCode.get(cur.parentCode);
        if (!parent) break;
        let set = descendants.get(parent.code);
        if (!set) {
          set = new Set<string>();
          descendants.set(parent.code, set);
        }
        set.add(node.code);
        cur = parent;
      }
    }
    return descendants;
  }

  private async ensurePermissionIndexes(force = false): Promise<void> {
    if (
      !force &&
      this.permissionByCode.size > 0 &&
      Date.now() - this.lastPermFetchMs <= this.permIndexTtlMs
    )
      return;

    if (this.permissionIndexRefreshInFlight) {
      await this.permissionIndexRefreshInFlight;
      return;
    }

    this.permissionIndexRefreshInFlight = (async () => {
      const byCode = new Map<string, PermissionNode>();
      const nodes = await this.rbacRepo.findPermissions();
      const byId = new Map<string, { code: string; parentId: string | null }>();
      for (const n of nodes) {
        byId.set(String(n.id), {
          code: n.code,
          parentId: n.parentId != null ? String(n.parentId) : null,
        });
      }
      for (const n of nodes) {
        const parent = n.parentId != null ? byId.get(String(n.parentId)) : null;
        if (n.code) byCode.set(n.code, { code: n.code, parentCode: parent?.code ?? null });
      }
      // Rebuild descendants atomically cung permissionByCode (cung diem reset).
      const descendants = this.buildDescendants(byCode);
      this.permissionByCode = byCode;
      this.descendantsByCode = descendants;
      this.lastPermFetchMs = Date.now();
    })();

    try {
      await this.permissionIndexRefreshInFlight;
    } finally {
      this.permissionIndexRefreshInFlight = null;
    }
  }

  private grants(need: string, has: (code: string) => boolean): boolean {
    if (has(PERM.SYSTEM.MANAGE)) return true;
    if (has(need)) return true;
    const visited = new Set<string>();
    for (let cur = this.permissionByCode.get(need); cur?.parentCode; ) {
      if (visited.has(cur.parentCode)) break;
      visited.add(cur.parentCode);
      const parent = this.permissionByCode.get(cur.parentCode);
      if (!parent) break;
      if (parent.code && has(parent.code)) return true;
      cur = parent;
    }
    return false;
  }
}
