import { BadRequestException } from '@nestjs/common';
import { FileValidationService } from '../../../src/upload/services/file-validation.service';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46]);
const ZIP_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]);

function makeService(maxFileSize = 10 * 1024 * 1024) {
  const config = { get: jest.fn((k: string, d?: any) => k === 'storage.maxFileSize' ? maxFileSize : d) };
  const i18n = { t: jest.fn((key: string) => key) };
  return new FileValidationService(config as any, i18n as any);
}

function file(overrides: Partial<{ originalname: string; mimetype: string; size: number; buffer: Buffer }>) {
  const buf = overrides.buffer ?? PNG_MAGIC;
  return {
    originalname: overrides.originalname ?? 'photo.png',
    mimetype: overrides.mimetype ?? 'image/png',
    size: overrides.size ?? buf.length,
    buffer: buf,
  };
}

describe('FileValidationService — security guarantees', () => {
  let svc: FileValidationService;
  beforeEach(() => { svc = makeService(); });

  describe('extension allowlist / blocklist', () => {
    it('accepts a real PNG', () => {
      expect(svc.validateFile(file({}))).toMatchObject({ sanitizedOriginalName: 'photo.png' });
    });

    it('rejects executable-shaped filenames (.exe / .sh / .js)', () => {
      for (const ext of ['malware.exe', 'evil.sh', 'inject.js']) {
        expect(() => svc.validateFile(file({ originalname: ext, buffer: PNG_MAGIC }))).toThrow(BadRequestException);
      }
    });

    it('rejects SVG even when content looks like a real image', () => {
      // SVG has no fixed magic; its real risk is XSS when served as image/svg+xml
      const svgBuf = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
      expect(() => svc.validateFile(file({ originalname: 'pic.svg', mimetype: 'image/svg+xml', buffer: svgBuf })))
        .toThrow(BadRequestException);
    });

    it('rejects HTML / XML disguised as upload', () => {
      for (const name of ['x.html', 'x.htm', 'x.xml']) {
        expect(() => svc.validateFile(file({ originalname: name }))).toThrow(BadRequestException);
      }
    });
  });

  describe('magic-byte content check', () => {
    it('rejects a .png whose bytes are NOT a PNG (smuggled payload)', () => {
      const phpPayload = Buffer.from('<?php system($_GET["c"]); ?>', 'utf8');
      expect(() => svc.validateFile(file({ originalname: 'shell.png', buffer: phpPayload })))
        .toThrow(BadRequestException);
    });

    it('rejects a cross-category attack (image extension, PDF magic bytes)', () => {
      // Renaming PNG → JPG passes (same image category) — accepted because
      // Content-Type is set correctly when served. But a PDF disguised as
      // .png MUST be rejected: image category magic-bytes don't include PDF.
      expect(() => svc.validateFile(file({ originalname: 'sneaky.png', mimetype: 'image/png', buffer: PDF_MAGIC })))
        .toThrow(BadRequestException);
    });

    it('accepts a real JPEG', () => {
      const jpeg = Buffer.concat([JPEG_MAGIC, Buffer.alloc(100)]);
      const result = svc.validateFile(file({
        originalname: 'real.jpg', mimetype: 'image/jpeg', buffer: jpeg, size: jpeg.length,
      }));
      expect(result.sanitizedOriginalName).toBe('real.jpg');
    });

    it('accepts a real PDF', () => {
      const pdf = Buffer.concat([PDF_MAGIC, Buffer.from(' header ...')]);
      expect(() => svc.validateFile(file({
        originalname: 'doc.pdf', mimetype: 'application/pdf', buffer: pdf, size: pdf.length,
      }))).not.toThrow();
    });

    it('accepts a real ZIP for archive category', () => {
      const zip = Buffer.concat([ZIP_MAGIC, Buffer.alloc(50)]);
      expect(() => svc.validateFile(file({
        originalname: 'pack.zip', mimetype: 'application/zip', buffer: zip, size: zip.length,
      }))).not.toThrow();
    });
  });

  describe('size limits', () => {
    it('rejects empty files', () => {
      expect(() => svc.validateFile(file({ size: 0, buffer: Buffer.alloc(0) }))).toThrow(BadRequestException);
    });

    it('rejects oversized files', () => {
      const tiny = makeService(100);
      expect(() => tiny.validateFile(file({ size: 200, buffer: Buffer.concat([PNG_MAGIC, Buffer.alloc(192)]) })))
        .toThrow(BadRequestException);
    });
  });

  describe('filename sanitization', () => {
    it('strips path separators (Linux + Windows)', () => {
      const r = svc.validateFile(file({ originalname: '../../etc/passwd.png' }));
      expect(r.sanitizedOriginalName).not.toContain('..');
      expect(r.sanitizedOriginalName).not.toContain('/');
      expect(r.sanitizedOriginalName).not.toContain('\\');
    });

    it('removes Windows forbidden characters', () => {
      const r = svc.validateFile(file({ originalname: 'a<b>c|d?.png' }));
      expect(r.sanitizedOriginalName).not.toMatch(/[<>:"|?*]/);
    });

    it('truncates very long filenames while keeping the extension', () => {
      const long = 'a'.repeat(300) + '.png';
      const r = svc.validateFile(file({ originalname: long }));
      expect(r.sanitizedOriginalName.length).toBeLessThanOrEqual(255);
      expect(r.sanitizedOriginalName.endsWith('.png')).toBe(true);
    });
  });
});
