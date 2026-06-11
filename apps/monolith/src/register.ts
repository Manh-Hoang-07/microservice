import * as path from 'path';

// tsx CJS mode uses the entry-point's tsconfig for path resolution (not per-file).
// Services use `src/*` as a baseUrl-relative alias (e.g. `src/generated/prisma`),
// which tsx cannot resolve from the monolith context.
// This hook intercepts those bare `src/*` requires and rewrites them to the
// absolute path of the originating service before Node.js tries to resolve them.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const NodeModule = require('module') as { _resolveFilename: (...args: unknown[]) => string };

const APPS_DIR = path.resolve(__dirname, '../..');
const original = NodeModule._resolveFilename.bind(NodeModule);

NodeModule._resolveFilename = function (...args: unknown[]): string {
  const [request, parent] = args as [string, { filename?: string } | null, ...unknown[]];

  if (typeof request === 'string' && request.startsWith('src/') && parent?.filename) {
    const match = parent.filename.match(/[/\\]apps[/\\]([^/\\]+)[/\\]/);
    if (match && match[1] !== 'monolith') {
      try {
        return original(path.join(APPS_DIR, match[1], request), ...args.slice(1));
      } catch (_) {
        // fall through to default
      }
    }
  }

  return original(...args);
};
