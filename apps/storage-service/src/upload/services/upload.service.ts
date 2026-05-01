import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  FileMetadata,
  IUploadStrategy,
  UploadResult,
} from '../interfaces/upload-strategy.interface';

@Injectable()
export class UploadService {
  constructor(
    @Inject('UPLOAD_STRATEGY') private readonly strategy: IUploadStrategy,
    private readonly i18n: I18nService,
  ) {}

  async uploadFile(file: any): Promise<UploadResult> {
    if (!file) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new BadRequestException(this.i18n.t('upload.FILE_REQUIRED', { lang }));
    }

    return this.strategy.upload(file);
  }

  async uploadFiles(files: any[]): Promise<UploadResult[]> {
    if (!files || files.length === 0) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new BadRequestException(this.i18n.t('upload.FILES_REQUIRED', { lang }));
    }

    return Promise.all(files.map((file) => this.strategy.upload(file)));
  }

  async downloadFile(
    filename: string,
  ): Promise<{ stream: NodeJS.ReadableStream; metadata: FileMetadata }> {
    return this.strategy.download(filename);
  }

  async deleteFile(filename: string): Promise<void> {
    return this.strategy.delete(filename);
  }

  async listFiles(prefix?: string, limit?: number): Promise<FileMetadata[]> {
    return this.strategy.list(prefix, limit);
  }

  async fileExists(filename: string): Promise<boolean> {
    return this.strategy.exists(filename);
  }

  async getFileMetadata(filename: string): Promise<FileMetadata> {
    return this.strategy.getMetadata(filename);
  }
}
