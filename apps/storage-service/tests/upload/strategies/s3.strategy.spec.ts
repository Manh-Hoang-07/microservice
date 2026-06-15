import { Readable } from 'stream';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Mock the AWS SDK before importing the strategy
const mockSend = jest.fn();
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => ({ send: mockSend })),
    PutObjectCommand: jest.fn().mockImplementation((input) => ({ input })),
    GetObjectCommand: jest.fn(),
    DeleteObjectCommand: jest.fn(),
    HeadObjectCommand: jest.fn(),
    ListObjectsV2Command: jest.fn(),
  };
});

import { S3StorageStrategy } from '../../../src/modules/upload/strategies/s3.strategy';
import { PutObjectCommand } from '@aws-sdk/client-s3';

// The PutObjectCommand is mocked, so the strategy never consumes the Body
// stream. Close it safely (with an error listener) so the open fd is released
// before afterEach unlinks the temp file — avoids an unhandled ENOENT.
function closeBody(body: any) {
  if (body && typeof body.destroy === 'function') {
    body.on('error', () => undefined);
    body.destroy();
  }
}

function makeStrategy() {
  const config = {
    get: jest.fn((key: string) => {
      if (key === 'storage.s3') {
        return {
          endpoint: 'http://localhost:9000',
          bucket: 'test-bucket',
          region: 'us-east-1',
          accessKeyId: 'test-key',
          secretAccessKey: 'test-secret',
          forcePathStyle: true,
          baseUrl: 'http://localhost:9000/test-bucket',
        };
      }
      return undefined;
    }),
  };
  const i18n = { t: jest.fn((key: string) => key) };
  return new S3StorageStrategy(config as any, i18n as any);
}

describe('S3StorageStrategy', () => {
  let srcDir: string;
  const srcFiles: string[] = [];

  function diskFile(content: string, originalname: string, mimetype: string) {
    const buf = Buffer.from(content);
    const p = path.join(srcDir, `${Math.random().toString(36).slice(2)}.tmp`);
    fs.writeFileSync(p, buf);
    srcFiles.push(p);
    return { path: p, originalname, size: buf.length, mimetype };
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockSend.mockResolvedValue({});
    srcDir = fs.mkdtempSync(path.join(os.tmpdir(), 's3-src-'));
  });

  afterEach(() => {
    for (const p of srcFiles.splice(0)) {
      try { fs.unlinkSync(p); } catch { /* ignore */ }
    }
    try { fs.rmdirSync(srcDir); } catch { /* ignore */ }
  });

  describe('upload', () => {
    it('streams a fs ReadStream from file.path as Body (not a buffer)', async () => {
      const strategy = makeStrategy();
      const file = diskFile('test file content', 'photo.png', 'image/png');

      await strategy.upload(file);

      expect(PutObjectCommand).toHaveBeenCalledTimes(1);
      const callArgs = (PutObjectCommand as unknown as jest.Mock).mock.calls[0][0];

      // Body must be a stream (fs.ReadStream is a Readable), never a Buffer.
      expect(callArgs.Body).toBeInstanceOf(Readable);
      expect(callArgs.Body).toBeInstanceOf(fs.ReadStream);
      expect(Buffer.isBuffer(callArgs.Body)).toBe(false);
      // ContentLength must be supplied so PutObject can stream a non-seekable
      // source without buffering it to learn the length.
      expect(callArgs.ContentLength).toBe(file.size);

      // Drain so the read stream closes and afterEach can unlink.
      closeBody(callArgs.Body);
    });

    it('sets ContentType to octet-stream and includes ContentDisposition', async () => {
      const strategy = makeStrategy();
      const file = diskFile('data', 'doc.pdf', 'application/pdf');

      await strategy.upload(file);

      const callArgs = (PutObjectCommand as unknown as jest.Mock).mock.calls[0][0];
      expect(callArgs.ContentType).toBe('application/octet-stream');
      expect(callArgs.ContentDisposition).toContain('attachment');
      closeBody(callArgs.Body);
    });

    it('returns correct upload result with URL', async () => {
      const strategy = makeStrategy();
      const file = diskFile('data', 'image.jpg', 'image/jpeg');

      const result = await strategy.upload(file);

      expect(result.url).toContain('http://localhost:9000/test-bucket/');
      expect(result.filename).toMatch(/^\d+-[a-f0-9-]+\.jpg$/);
      expect(result.size).toBe(4);
      expect(result.mimetype).toBe('image/jpeg');
      const callArgs = (PutObjectCommand as unknown as jest.Mock).mock.calls[0][0];
      closeBody(callArgs.Body);
    });

    it('falls back to a Readable from buffer when path is absent', async () => {
      const strategy = makeStrategy();
      const file = {
        buffer: Buffer.from('legacy'),
        originalname: 'x.png',
        size: 6,
        mimetype: 'image/png',
      };

      await strategy.upload(file);

      const callArgs = (PutObjectCommand as unknown as jest.Mock).mock.calls[0][0];
      expect(callArgs.Body).toBeInstanceOf(Readable);
      expect(callArgs.Body).not.toBeInstanceOf(fs.ReadStream);
    });
  });
});
