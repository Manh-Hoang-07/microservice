// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../../src/modules/comment/admin/services/comment.service', () => ({ AdminCommentService: jest.fn() }));
jest.mock('../../../../../src/modules/comment/repositories/comment.repository', () => ({ CommentRepository: jest.fn() }));

// ---------------------------------------------------------------------------
import { ForbiddenException } from '@nestjs/common';
import { GroupCommentService } from '../../../../../src/modules/comment/group/services/group-comment.service';

function makeService({ row = undefined as any } = {}) {
  const comments = {
    getList: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
    updateStatus: jest.fn().mockResolvedValue({ id: BigInt(1) }),
  };
  const commentRepo = { findPostGroupId: jest.fn().mockResolvedValue(row) };
  const service = new GroupCommentService(comments as any, commentRepo as any);
  return { service, comments, commentRepo };
}

describe('GroupCommentService (delegator)', () => {
  afterEach(() => jest.clearAllMocks());

  it('list loc theo groupId', async () => {
    const { service, comments } = makeService();
    await service.list('10', { status: 'pending' });
    expect(comments.getList).toHaveBeenCalledWith({ status: 'pending', groupId: '10' });
  });

  it('updateStatus cho qua khi comment thuoc nhom', async () => {
    const { service, comments } = makeService({ row: { id: BigInt(1), post: { groupId: BigInt(10) } } });
    await service.updateStatus('10', BigInt(1), 'visible');
    expect(comments.updateStatus).toHaveBeenCalledWith(BigInt(1), 'visible');
  });

  it('updateStatus chan khi comment thuoc nhom khac', async () => {
    const { service, comments } = makeService({ row: { id: BigInt(1), post: { groupId: BigInt(77) } } });
    await expect(service.updateStatus('10', BigInt(1), 'visible')).rejects.toThrow(ForbiddenException);
    expect(comments.updateStatus).not.toHaveBeenCalled();
  });

  it('updateStatus chan khi comment khong ton tai', async () => {
    const { service } = makeService({ row: null });
    await expect(service.updateStatus('10', BigInt(1), 'visible')).rejects.toThrow(ForbiddenException);
  });
});
