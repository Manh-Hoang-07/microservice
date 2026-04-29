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
import { Response } from 'express';
import { UploadService } from '../services/upload.service';
import { FileValidationService } from '../services/file-validation.service';
import { Permission } from '../../common/permission.decorator';
import { UploadResponseDto } from '../dtos/upload.dto';
import { FileMetadata } from '../interfaces/upload-strategy.interface';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly fileValidationService: FileValidationService,
    private readonly configService: ConfigService,
  ) {}

  @Permission('public')
  @Post('file')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        // Keep this aligned with default storage.maxFileSize (10MB) to avoid large in-memory buffers.
        // The FileValidationService also double-checks using config.
        fileSize: 10485760,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: any): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Validate type + content + size, and sanitize name
    const { sanitizedOriginalName } =
      this.fileValidationService.validateFile(file);
    file.originalname = sanitizedOriginalName;

    return this.uploadService.uploadFile(file);
  }

  @Permission('public')
  @Post('files')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        // Keep this aligned with default storage.maxFileSize (10MB) to avoid large in-memory buffers.
        // The FileValidationService also double-checks using config.
        fileSize: 10485760,
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: any[],
  ): Promise<UploadResponseDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Files are required');
    }

    // Validate each file (type + content + size) and sanitize names
    for (const file of files) {
      const { sanitizedOriginalName } =
        this.fileValidationService.validateFile(file);
      file.originalname = sanitizedOriginalName;
    }

    return this.uploadService.uploadFiles(files);
  }

  @Get()
  @Permission('storage:list')
  async listFiles(
    @Query('prefix') prefix?: string,
    @Query('limit') limit?: string,
  ): Promise<FileMetadata[]> {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    return this.uploadService.listFiles(prefix, parsedLimit);
  }

  @Get('allowed-types')
  @Permission('public')
  async getAllowedTypes(): Promise<{ types: string[]; maxSize: number }> {
    const types = this.fileValidationService.getAllowedFileTypes();
    const maxSize = this.configService.get<number>(
      'storage.maxFileSize',
      10485760,
    );
    return { types, maxSize };
  }

  @Get('meta/:filename')
  @Permission('storage:read')
  async getMetadata(
    @Param('filename') filename: string,
  ): Promise<FileMetadata> {
    return this.uploadService.getFileMetadata(filename);
  }

  @Get(':filename')
  @Permission('public')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const storageType = this.configService.get<string>('STORAGE_TYPE') || 'local';

    if (storageType === 'local') {
      const { stream, metadata } =
        await this.uploadService.downloadFile(filename);
      res.setHeader('Content-Type', metadata.mimetype);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${metadata.filename}"`,
      );
      stream.pipe(res);
    } else {
      // For S3 and Cloudinary: redirect to the public CDN URL
      const { metadata } = await this.uploadService.downloadFile(filename);
      res.redirect(302, metadata.url);
    }
  }

  @Delete(':filename')
  @Permission('storage:delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param('filename') filename: string): Promise<void> {
    return this.uploadService.deleteFile(filename);
  }
}
