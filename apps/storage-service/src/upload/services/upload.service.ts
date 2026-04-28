import { Injectable, Inject } from '@nestjs/common';
import {
  FileMetadata,
  IUploadStrategy,
  UploadResult,
} from '../interfaces/upload-strategy.interface';

@Injectable()
export class UploadService {
  constructor(
    @Inject('UPLOAD_STRATEGY') private readonly strategy: IUploadStrategy,
  ) {}

  async uploadFile(file: any): Promise<UploadResult> {
    if (!file) {
      throw new Error('File is required');
    }

    return this.strategy.upload(file);
  }

  async uploadFiles(files: any[]): Promise<UploadResult[]> {
    if (!files || files.length === 0) {
      throw new Error('Files are required');
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
