import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { LocalStorageStrategy } from '../../../src/modules/upload/strategies/local.strategy';

function makeStrategy(destination: string) {
  const config = {
    get: jest.fn((key: string) => {
      if (key === 'storage.local') {
        return {
          destination,
          baseUrl: 'http://localhost:3004/uploads',
        };
      }
      return undefined;
    }),
  };
  const i18n = { t: jest.fn((key: string) => key) };
  return new LocalStorageStrategy(config as any, i18n as any);
}

describe('LocalStorageStrategy', () => {
  let tmpDir: string;
  let srcDir: string;
  const srcFiles: string[] = [];

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'storage-test-'));
    srcDir = fs.mkdtempSync(path.join(os.tmpdir(), 'storage-src-'));
  });

  afterEach(() => {
    // Clean up destination + temp source files
    for (const dir of [tmpDir, srcDir]) {
      try {
        const files = fs.readdirSync(dir);
        for (const f of files) fs.unlinkSync(path.join(dir, f));
        fs.rmdirSync(dir);
      } catch {
        // ignore cleanup errors
      }
    }
    srcFiles.splice(0);
  });

  // Build a diskStorage-shaped file: content lives at `path`, no `buffer`.
  function diskFile(content: Buffer | string, originalname: string, mimetype: string) {
    const buf = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const p = path.join(srcDir, `${Math.random().toString(36).slice(2)}.tmp`);
    fs.writeFileSync(p, buf);
    srcFiles.push(p);
    return { path: p, originalname, size: buf.length, mimetype };
  }

  describe('upload — streams from temp file path', () => {
    it('writes file content correctly by streaming from file.path', async () => {
      const strategy = makeStrategy(tmpDir);
      const content = 'Hello, stream pipeline test!';
      const file = diskFile(content, 'test.txt', 'text/plain');

      const result = await strategy.upload(file);

      // Verify file was written to destination
      expect(fs.existsSync(result.path)).toBe(true);
      const written = fs.readFileSync(result.path, 'utf8');
      expect(written).toBe(content);
    });

    it('returns correct upload result metadata', async () => {
      const strategy = makeStrategy(tmpDir);
      const file = diskFile('test data', 'photo.png', 'image/png');

      const result = await strategy.upload(file);

      expect(result.filename).toMatch(/^\d+-[a-f0-9-]+\.png$/);
      expect(result.url).toContain('http://localhost:3004/uploads/');
      expect(result.size).toBe(9);
      expect(result.mimetype).toBe('image/png');
    });

    it('handles large files without error (streamed)', async () => {
      const strategy = makeStrategy(tmpDir);
      // 1MB to verify pipeline handles backpressure
      const large = Buffer.alloc(1024 * 1024, 0x42);
      const file = diskFile(large, 'large.bin', 'application/octet-stream');

      const result = await strategy.upload(file);

      const stat = fs.statSync(result.path);
      expect(stat.size).toBe(large.length);
    });

    it('generates unique filenames for concurrent uploads', async () => {
      const strategy = makeStrategy(tmpDir);
      const files = Array.from({ length: 5 }, (_, i) =>
        diskFile(`content-${i}`, 'same.txt', 'text/plain'),
      );

      const results = await Promise.all(files.map((f) => strategy.upload(f)));
      const filenames = results.map((r) => r.filename);

      expect(new Set(filenames).size).toBe(5);
    });

    it('falls back to buffer when path is absent (back-compat)', async () => {
      const strategy = makeStrategy(tmpDir);
      const file = {
        buffer: Buffer.from('legacy buffer'),
        originalname: 'legacy.txt',
        size: 13,
        mimetype: 'text/plain',
      };

      const result = await strategy.upload(file);
      expect(fs.readFileSync(result.path, 'utf8')).toBe('legacy buffer');
    });
  });
});
