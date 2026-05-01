import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';
import * as fs from 'fs';
import * as path from 'path';
import {
  FileMetadata,
  IUploadStrategy,
  UploadResult,
} from '../interfaces/upload-strategy.interface';

@Injectable()
export class LocalStorageStrategy implements IUploadStrategy {
  private readonly destination: string;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    const storageConfig = this.configService.get('storage.local');
    this.destination = storageConfig.destination;
    this.baseUrl = storageConfig.baseUrl;
  }

  private fileNotFound(filename: string): NotFoundException {
    const lang = I18nContext.current()?.lang ?? 'en';
    return new NotFoundException(
      this.i18n.t('storage.FILE_NOT_FOUND', { lang, args: { filename } }),
    );
  }

  private ensureDirectoryExists(): void {
    try {
      if (!fs.existsSync(this.destination)) {
        fs.mkdirSync(this.destination, { recursive: true });
      }
    } catch (error: any) {
      console.warn(
        `[LocalStorageStrategy] Could not create local storage directory at ${this.destination}: ${error.message}`,
      );
    }
  }

  private buildUrl(filename: string): string {
    const baseUrl = this.baseUrl.endsWith('/')
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;
    return `${baseUrl}/${filename}`;
  }

  async upload(file: any): Promise<UploadResult> {
    this.ensureDirectoryExists();
    // Tạo tên file unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${randomString}${ext}`;

    // Đường dẫn đầy đủ để lưu file
    const filePath = path.join(this.destination, filename);

    // Lưu file bằng Stream để tránh chặn Event Loop (Async)
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (err) => reject(err));
      writeStream.write(file.buffer);
      writeStream.end();
    });

    // Tạo URL để truy cập file (đảm bảo baseUrl không có trailing slash)
    const url = this.buildUrl(filename);

    return {
      path: filePath,
      url,
      filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async download(
    filename: string,
  ): Promise<{ stream: NodeJS.ReadableStream; metadata: FileMetadata }> {
    const filePath = path.join(this.destination, filename);
    if (!fs.existsSync(filePath)) {
      throw this.fileNotFound(filename);
    }
    const stat = await fs.promises.stat(filePath);
    const metadata: FileMetadata = {
      filename,
      size: stat.size,
      mimetype: 'application/octet-stream',
      url: this.buildUrl(filename),
      createdAt: stat.birthtime,
    };
    const stream = fs.createReadStream(filePath);
    return { stream, metadata };
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.destination, filename);
    if (!fs.existsSync(filePath)) {
      throw this.fileNotFound(filename);
    }
    await fs.promises.unlink(filePath);
  }

  async list(prefix?: string, limit = 50): Promise<FileMetadata[]> {
    this.ensureDirectoryExists();
    const entries = await fs.promises.readdir(this.destination);
    const filtered = prefix
      ? entries.filter((name) => name.startsWith(prefix))
      : entries;

    const metadataList: FileMetadata[] = [];
    for (const name of filtered) {
      const filePath = path.join(this.destination, name);
      try {
        const stat = await fs.promises.stat(filePath);
        if (stat.isFile()) {
          metadataList.push({
            filename: name,
            size: stat.size,
            mimetype: 'application/octet-stream',
            url: this.buildUrl(name),
            createdAt: stat.birthtime,
          });
        }
      } catch {
        // Skip entries that can't be stat'd
      }
    }

    // Sort by creation time descending (newest first)
    metadataList.sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
    );

    return metadataList.slice(0, limit);
  }

  exists(filename: string): Promise<boolean> {
    const filePath = path.join(this.destination, filename);
    return Promise.resolve(fs.existsSync(filePath));
  }

  async getMetadata(filename: string): Promise<FileMetadata> {
    const filePath = path.join(this.destination, filename);
    if (!fs.existsSync(filePath)) {
      throw this.fileNotFound(filename);
    }
    const stat = await fs.promises.stat(filePath);
    return {
      filename,
      size: stat.size,
      mimetype: 'application/octet-stream',
      url: this.buildUrl(filename),
      createdAt: stat.birthtime,
    };
  }
}
