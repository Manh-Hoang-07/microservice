import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { UploadController } from '../../../src/modules/upload/controllers/upload.controller';

function makeController(overrides?: {
  uploadFile?: jest.Mock;
  uploadFiles?: jest.Mock;
  validateFile?: jest.Mock;
}) {
  const uploadService = {
    uploadFile: overrides?.uploadFile ?? jest.fn(async () => ({ filename: 'out.png' })),
    uploadFiles: overrides?.uploadFiles ?? jest.fn(async (files: any[]) => files.map(() => ({ filename: 'out.png' }))),
  };
  const fileValidationService = {
    validateFile:
      overrides?.validateFile ??
      jest.fn(async (f: any) => ({ sanitizedOriginalName: f.originalname })),
  };
  const configService = { get: jest.fn((_k: string, d?: any) => d) };
  const i18n = { t: jest.fn((k: string) => k) };
  const controller = new UploadController(
    uploadService as any,
    fileValidationService as any,
    configService as any,
    i18n as any,
  );
  return { controller, uploadService, fileValidationService };
}

describe('UploadController — temp file cleanup', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ctrl-tmp-'));
  });

  afterEach(() => {
    try {
      for (const f of fs.readdirSync(tmpDir)) fs.unlinkSync(path.join(tmpDir, f));
      fs.rmdirSync(tmpDir);
    } catch {
      // ignore
    }
  });

  function tempFile(name = 'photo.png'): any {
    const p = path.join(tmpDir, `${Math.random().toString(36).slice(2)}.tmp`);
    fs.writeFileSync(p, Buffer.from('data'));
    return { path: p, originalname: name, size: 4, mimetype: 'image/png' };
  }

  describe('uploadFile', () => {
    it('deletes the temp file after a successful upload', async () => {
      const { controller } = makeController();
      const file = tempFile();

      await controller.uploadFile(file);

      expect(fs.existsSync(file.path)).toBe(false);
    });

    it('deletes the temp file even when upload throws', async () => {
      const { controller } = makeController({
        uploadFile: jest.fn(async () => {
          throw new Error('strategy boom');
        }),
      });
      const file = tempFile();

      await expect(controller.uploadFile(file)).rejects.toThrow('strategy boom');
      expect(fs.existsSync(file.path)).toBe(false);
    });

    it('deletes the temp file even when validation rejects', async () => {
      const { controller } = makeController({
        validateFile: jest.fn(async () => {
          throw new BadRequestException('bad content');
        }),
      });
      const file = tempFile('shell.png');

      await expect(controller.uploadFile(file)).rejects.toThrow(BadRequestException);
      expect(fs.existsSync(file.path)).toBe(false);
    });
  });

  describe('uploadFiles', () => {
    it('deletes ALL temp files after a successful batch', async () => {
      const { controller } = makeController();
      const files = [tempFile('a.png'), tempFile('b.png'), tempFile('c.png')];

      await controller.uploadFiles(files);

      for (const f of files) expect(fs.existsSync(f.path)).toBe(false);
    });

    it('deletes ALL temp files when the batch upload fails', async () => {
      const { controller } = makeController({
        uploadFiles: jest.fn(async () => {
          throw new Error('batch failed');
        }),
      });
      const files = [tempFile('a.png'), tempFile('b.png')];

      await expect(controller.uploadFiles(files)).rejects.toThrow('batch failed');
      for (const f of files) expect(fs.existsSync(f.path)).toBe(false);
    });

    it('cleans up remaining temp files when validation rejects mid-batch', async () => {
      const validateFile = jest
        .fn()
        .mockImplementationOnce(async (f: any) => ({ sanitizedOriginalName: f.originalname }))
        .mockImplementationOnce(async () => {
          throw new BadRequestException('bad content');
        });
      const { controller } = makeController({ validateFile });
      const files = [tempFile('a.png'), tempFile('b.png'), tempFile('c.png')];

      await expect(controller.uploadFiles(files)).rejects.toThrow(BadRequestException);
      // finally block must unlink every temp file in the batch, including the
      // ones never reached by validation.
      for (const f of files) expect(fs.existsSync(f.path)).toBe(false);
    });
  });
});
