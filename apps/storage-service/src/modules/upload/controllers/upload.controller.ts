import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Res,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { UploadService } from '../services/upload.service';
import { FileValidationService } from '../services/file-validation.service';
import { Public } from '@package/common';
import { UploadResponseDto } from '../dtos/upload.dto';
import { FileMetadata } from '../interfaces/upload-strategy.interface';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

// Thư mục ghi file tạm cho multer diskStorage. Ưu tiên STORAGE_TEMP_DIR,
// fallback về tmpdir của OS. Tạo sẵn (đồng bộ, 1 lần lúc load module) để
// multer luôn có nơi ghi. KHÔNG dùng memoryStorage để tránh nạp trọn file
// vào RAM (gốc của vấn đề OOM).
const TEMP_UPLOAD_DIR =
  process.env.STORAGE_TEMP_DIR || path.join(os.tmpdir(), 'storage-uploads');
try {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
} catch {
  // Sẽ thử lại trong destination callback nếu thư mục chưa sẵn sàng.
}

const diskStorageEngine = diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdir(TEMP_UPLOAD_DIR, { recursive: true }, (err) =>
      cb(err, TEMP_UPLOAD_DIR),
    );
  },
  // Tên file tạm ngẫu nhiên, không tin originalname (tránh path traversal).
  filename: (_req, _file, cb) => cb(null, `${Date.now()}-${randomUUID()}.tmp`),
});

// Xóa file tạm an toàn (không throw nếu file không tồn tại). Dùng trong
// finally để LUÔN dọn dẹp dù thành công hay lỗi.
async function cleanupTempFiles(files: any[]): Promise<void> {
  await Promise.allSettled(
    files
      .filter((f) => f && typeof f.path === 'string')
      .map((f) => fs.promises.unlink(f.path).catch(() => undefined)),
  );
}

// Strategy filenames are `<timestamp>-<rand><ext>`. Restrict :filename param
// to that alphabet so `..`, `/`, `\`, NUL, control chars, and quotes can't
// reach strategy code (path-traversal + Content-Disposition injection).
const SAFE_FILENAME_RE = /^[A-Za-z0-9._-]{1,255}$/;
function assertSafeFilename(filename: string): string {
  if (
    !filename ||
    typeof filename !== 'string' ||
    !SAFE_FILENAME_RE.test(filename) ||
    filename.includes('..')
  ) {
    throw new BadRequestException('Invalid filename');
  }
  return filename;
}

const MAX_UPLOAD_FILES = 10;

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly fileValidationService: FileValidationService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private get maxFileSize(): number {
    return this.configService.get<number>('storage.maxFileSize', 10_485_760);
  }

  @Public()
  @Post('file')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorageEngine,
      limits: {
        fileSize: 10_485_760,
        files: 1,
        fields: 5,
        fieldSize: 1024,
        parts: 6,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: any): Promise<UploadResponseDto> {
    if (!file) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new BadRequestException(this.i18n.t('upload.FILE_REQUIRED', { lang }));
    }
    // LUÔN dọn file tạm dù validate/upload thành công hay lỗi.
    try {
      if (file.truncated) {
        const lang = I18nContext.current()?.lang ?? 'en';
        throw new BadRequestException(
          this.i18n.t('upload.FILE_TOO_LARGE', {
            lang,
            args: { maxSizeMB: (this.maxFileSize / 1024 / 1024).toFixed(2) },
          }),
        );
      }

      const { sanitizedOriginalName } =
        await this.fileValidationService.validateFile(file);
      file.originalname = sanitizedOriginalName;

      return await this.uploadService.uploadFile(file);
    } finally {
      await cleanupTempFiles([file]);
    }
  }

  @Public()
  @Post('files')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseInterceptors(
    FilesInterceptor('files', MAX_UPLOAD_FILES, {
      storage: diskStorageEngine,
      limits: {
        fileSize: 10_485_760,
        files: MAX_UPLOAD_FILES,
        fields: 5,
        fieldSize: 1024,
        parts: MAX_UPLOAD_FILES + 5,
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: any[],
  ): Promise<UploadResponseDto[]> {
    if (!files || files.length === 0) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new BadRequestException(this.i18n.t('upload.FILES_REQUIRED', { lang }));
    }

    // LUÔN dọn toàn bộ file tạm của batch (kể cả file lỗi giữa chừng).
    try {
      for (const file of files) {
        if (file.truncated) {
          const lang = I18nContext.current()?.lang ?? 'en';
          throw new BadRequestException(
            this.i18n.t('upload.FILE_TOO_LARGE', {
              lang,
              args: { maxSizeMB: (this.maxFileSize / 1024 / 1024).toFixed(2) },
            }),
          );
        }
        const { sanitizedOriginalName } =
          await this.fileValidationService.validateFile(file);
        file.originalname = sanitizedOriginalName;
      }

      return await this.uploadService.uploadFiles(files);
    } finally {
      await cleanupTempFiles(files);
    }
  }

  @Get()
  @Public()
  async listFiles(
    @Query('prefix') prefix?: string,
    @Query('limit') limit?: string,
  ): Promise<FileMetadata[]> {
    if (prefix && !/^[A-Za-z0-9._/-]{0,128}$/.test(prefix)) {
      throw new BadRequestException('Invalid prefix');
    }
    const parsedLimit = limit
      ? Math.min(Math.max(parseInt(limit, 10) || 50, 1), 500)
      : undefined;
    return this.uploadService.listFiles(prefix, parsedLimit);
  }

  @Get('allowed-types')
  @Public()
  async getAllowedTypes(): Promise<{ types: string[]; maxSize: number }> {
    const types = this.fileValidationService.getAllowedFileTypes();
    return { types, maxSize: this.maxFileSize };
  }

  @Get('meta/:filename')
  @Public()
  async getMetadata(
    @Param('filename') filename: string,
  ): Promise<FileMetadata> {
    return this.uploadService.getFileMetadata(assertSafeFilename(filename));
  }

  @Get(':filename')
  @Public()
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: any,
  ): Promise<void> {
    const safe = assertSafeFilename(filename);
    // Read the configured strategy from the Nest config namespace, NOT the
    // raw env var — they may diverge during tests/runtime overrides.
    const storageType = this.configService.get<string>('storage.type', 'local');

    if (storageType === 'local') {
      const { stream, metadata } = await this.uploadService.downloadFile(safe);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'no-referrer');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Content-Type', metadata.mimetype || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${safe}"`);
      stream.pipe(res);
    } else {
      const { metadata } = await this.uploadService.downloadFile(safe);
      res.redirect(302, metadata.url);
    }
  }

  @Delete(':filename')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param('filename') filename: string): Promise<void> {
    return this.uploadService.deleteFile(assertSafeFilename(filename));
  }
}
