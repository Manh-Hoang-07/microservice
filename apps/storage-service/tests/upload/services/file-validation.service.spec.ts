import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { FileValidationService } from '../../../src/modules/upload/services/file-validation.service';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46]);
const ZIP_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]);

function makeService(maxFileSize = 10 * 1024 * 1024) {
  const config = { get: jest.fn((k: string, d?: any) => k === 'storage.maxFileSize' ? maxFileSize : d) };
  const i18n = { t: jest.fn((key: string) => key) };
  return new FileValidationService(config as any, i18n as any);
}

describe('FileValidationService — security guarantees (disk-backed)', () => {
  let svc: FileValidationService;
  let tmpDir: string;
  const created: string[] = [];

  beforeEach(() => {
    svc = makeService();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'storage-val-'));
  });

  afterEach(() => {
    for (const p of created.splice(0)) {
      try { fs.unlinkSync(p); } catch { /* ignore */ }
    }
    try { fs.rmdirSync(tmpDir); } catch { /* ignore */ }
  });

  // Build a multer-diskStorage-shaped file: content lives ON DISK at `path`,
  // there is intentionally NO `buffer` field (mirrors production after the
  // memoryStorage → diskStorage refactor).
  function file(overrides: Partial<{ originalname: string; mimetype: string; size: number; buffer: Buffer }>) {
    const buf = overrides.buffer ?? PNG_MAGIC;
    const filePath = path.join(tmpDir, `${Math.random().toString(36).slice(2)}.bin`);
    fs.writeFileSync(filePath, buf);
    created.push(filePath);
    return {
      originalname: overrides.originalname ?? 'photo.png',
      mimetype: overrides.mimetype ?? 'image/png',
      size: overrides.size ?? buf.length,
      path: filePath,
    };
  }

  describe('extension allowlist / blocklist', () => {
    it('accepts a real PNG', async () => {
      await expect(svc.validateFile(file({}))).resolves.toMatchObject({ sanitizedOriginalName: 'photo.png' });
    });

    it('rejects executable-shaped filenames (.exe / .sh / .js)', async () => {
      for (const ext of ['malware.exe', 'evil.sh', 'inject.js']) {
        await expect(svc.validateFile(file({ originalname: ext, buffer: PNG_MAGIC }))).rejects.toThrow(BadRequestException);
      }
    });

    it('rejects SVG even when content looks like a real image', async () => {
      const svgBuf = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
      await expect(svc.validateFile(file({ originalname: 'pic.svg', mimetype: 'image/svg+xml', buffer: svgBuf })))
        .rejects.toThrow(BadRequestException);
    });

    it('rejects HTML / XML disguised as upload', async () => {
      for (const name of ['x.html', 'x.htm', 'x.xml']) {
        await expect(svc.validateFile(file({ originalname: name }))).rejects.toThrow(BadRequestException);
      }
    });
  });

  describe('magic-byte content check (read from disk, not buffer)', () => {
    it('rejects a .png whose bytes are NOT a PNG (smuggled payload)', async () => {
      const phpPayload = Buffer.from('<?php system($_GET["c"]); ?>', 'utf8');
      await expect(svc.validateFile(file({ originalname: 'shell.png', buffer: phpPayload })))
        .rejects.toThrow(BadRequestException);
    });

    it('rejects a cross-category attack (image extension, PDF magic bytes)', async () => {
      await expect(svc.validateFile(file({ originalname: 'sneaky.png', mimetype: 'image/png', buffer: PDF_MAGIC })))
        .rejects.toThrow(BadRequestException);
    });

    it('accepts a real JPEG', async () => {
      const jpeg = Buffer.concat([JPEG_MAGIC, Buffer.alloc(100)]);
      const result = await svc.validateFile(file({
        originalname: 'real.jpg', mimetype: 'image/jpeg', buffer: jpeg, size: jpeg.length,
      }));
      expect(result.sanitizedOriginalName).toBe('real.jpg');
    });

    it('accepts a real PDF', async () => {
      const pdf = Buffer.concat([PDF_MAGIC, Buffer.from(' header ...')]);
      await expect(svc.validateFile(file({
        originalname: 'doc.pdf', mimetype: 'application/pdf', buffer: pdf, size: pdf.length,
      }))).resolves.toBeDefined();
    });

    it('accepts a real ZIP for archive category', async () => {
      const zip = Buffer.concat([ZIP_MAGIC, Buffer.alloc(50)]);
      await expect(svc.validateFile(file({
        originalname: 'pack.zip', mimetype: 'application/zip', buffer: zip, size: zip.length,
      }))).resolves.toBeDefined();
    });

    it('only reads a small header from disk regardless of file size', async () => {
      // 5MB file that starts with PNG magic; validation must succeed by
      // reading just the header, never loading the whole file into memory.
      const big = Buffer.concat([PNG_MAGIC, Buffer.alloc(5 * 1024 * 1024, 0x00)]);
      const result = await svc.validateFile(file({
        originalname: 'huge.png', mimetype: 'image/png', buffer: big, size: big.length,
      }));
      expect(result.sanitizedOriginalName).toBe('huge.png');
    });
  });

  describe('buffer fallback (no path — back-compat)', () => {
    it('validates magic bytes from buffer when path is absent', async () => {
      const f = {
        originalname: 'photo.png',
        mimetype: 'image/png',
        size: PNG_MAGIC.length,
        buffer: PNG_MAGIC,
      };
      await expect(svc.validateFile(f)).resolves.toMatchObject({ sanitizedOriginalName: 'photo.png' });
    });
  });

  describe('size limits', () => {
    it('rejects empty files', async () => {
      await expect(svc.validateFile(file({ size: 0, buffer: Buffer.alloc(0) }))).rejects.toThrow(BadRequestException);
    });

    it('rejects oversized files', async () => {
      const tiny = makeService(100);
      await expect(tiny.validateFile(file({ size: 200, buffer: Buffer.concat([PNG_MAGIC, Buffer.alloc(192)]) })))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('filename sanitization', () => {
    it('strips path separators (Linux + Windows)', async () => {
      const r = await svc.validateFile(file({ originalname: '../../etc/passwd.png' }));
      expect(r.sanitizedOriginalName).not.toContain('..');
      expect(r.sanitizedOriginalName).not.toContain('/');
      expect(r.sanitizedOriginalName).not.toContain('\\');
    });

    it('removes Windows forbidden characters', async () => {
      const r = await svc.validateFile(file({ originalname: 'a<b>c|d?.png' }));
      expect(r.sanitizedOriginalName).not.toMatch(/[<>:"|?*]/);
    });

    it('truncates very long filenames while keeping the extension', async () => {
      const long = 'a'.repeat(300) + '.png';
      const r = await svc.validateFile(file({ originalname: long }));
      expect(r.sanitizedOriginalName.length).toBeLessThanOrEqual(255);
      expect(r.sanitizedOriginalName.endsWith('.png')).toBe(true);
    });
  });
});
