// ---------------------------------------------------------------------------
// Module mocks — chan transitive Prisma / class-validator
// ---------------------------------------------------------------------------
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../../src/modules/post/admin/services/post.service', () => ({ AdminPostService: jest.fn() }));
jest.mock('../../../../../src/modules/post/repositories/post.repository', () => ({ PostRepository: jest.fn() }));
jest.mock('../../../../../src/modules/category/repositories/category.repository', () => ({ CategoryRepository: jest.fn() }));
jest.mock('../../../../../src/modules/post/admin/dtos/create-post.dto', () => ({ CreatePostDto: class {} }));
jest.mock('../../../../../src/modules/post/admin/dtos/update-post.dto', () => ({ UpdatePostDto: class {} }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException } from '@nestjs/common';
import { GroupPostService } from '../../../../../src/modules/post/group/services/group-post.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeService({ post = undefined as any } = {}) {
  const posts = {
    getList: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
    getOne: jest.fn().mockResolvedValue({ id: BigInt(1) }),
    create: jest.fn().mockResolvedValue({ id: BigInt(1) }),
    update: jest.fn().mockResolvedValue({ id: BigInt(1) }),
    delete: jest.fn().mockResolvedValue({ success: true }),
  };
  const postRepo = {
    findById: jest.fn().mockResolvedValue(post),
  };
  const categoryRepo = {
    findRootActiveTree: jest.fn().mockResolvedValue([{ id: BigInt(1) }]),
  };
  const service = new GroupPostService(posts as any, postRepo as any, categoryRepo as any);
  return { service, posts, postRepo, categoryRepo };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GroupPostService (delegator)', () => {
  afterEach(() => jest.clearAllMocks());

  describe('list', () => {
    it('loc cung theo groupId', async () => {
      const { service, posts } = makeService();
      await service.list('10', { page: 1, status: 'published' });
      expect(posts.getList).toHaveBeenCalledWith({ page: 1, status: 'published', groupId: '10' });
    });
  });

  describe('create', () => {
    it('gan groupId tu route (ghi de body)', async () => {
      const { service, posts } = makeService();
      await service.create('10', { name: 'X', groupId: '999' } as any, BigInt(7));
      expect(posts.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'X', groupId: '10' }),
        BigInt(7),
      );
    });
  });

  describe('getOne / update / remove — kiem tra post thuoc nhom', () => {
    it('getOne cho qua khi post thuoc nhom', async () => {
      const { service, posts } = makeService({ post: { id: BigInt(1), groupId: BigInt(10) } });
      await service.getOne('10', BigInt(1));
      expect(posts.getOne).toHaveBeenCalledWith(BigInt(1));
    });

    it('update chan khi post thuoc nhom khac', async () => {
      const { service, posts } = makeService({ post: { id: BigInt(1), groupId: BigInt(77) } });
      await expect(service.update('10', BigInt(1), {} as any)).rejects.toThrow(ForbiddenException);
      expect(posts.update).not.toHaveBeenCalled();
    });

    it('remove chan khi post khong ton tai', async () => {
      const { service, posts } = makeService({ post: null });
      await expect(service.remove('10', BigInt(1))).rejects.toThrow(ForbiddenException);
      expect(posts.delete).not.toHaveBeenCalled();
    });

    it('remove cho qua khi post thuoc nhom', async () => {
      const { service, posts } = makeService({ post: { id: BigInt(1), groupId: BigInt(10) } });
      await service.remove('10', BigInt(1));
      expect(posts.delete).toHaveBeenCalledWith(BigInt(1));
    });
  });

  describe('getCategories', () => {
    it('tra ve cay danh muc active', async () => {
      const { service, categoryRepo } = makeService();
      const res = await service.getCategories();
      expect(categoryRepo.findRootActiveTree).toHaveBeenCalled();
      expect(res).toHaveLength(1);
    });
  });
});
