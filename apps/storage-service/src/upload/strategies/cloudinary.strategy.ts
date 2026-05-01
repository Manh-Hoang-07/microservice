import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as path from 'path';
import {
  FileMetadata,
  IUploadStrategy,
  UploadResult,
} from '../interfaces/upload-strategy.interface';

@Injectable()
export class CloudinaryStorageStrategy implements IUploadStrategy {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    const config = this.configService.get('storage.cloudinary');

    cloudinary.config({
      cloud_name: config?.cloudName,
      api_key: config?.apiKey,
      api_secret: config?.apiSecret,
    });
  }

  private fileNotFound(filename: string): NotFoundException {
    const lang = I18nContext.current()?.lang ?? 'en';
    return new NotFoundException(
      this.i18n.t('storage.FILE_NOT_FOUND', { lang, args: { filename } }),
    );
  }

  private translate(key: string, args: Record<string, unknown>): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang, args }) as string;
  }

  async upload(file: any): Promise<UploadResult> {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    const publicId = `${timestamp}-${randomString}`;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: 'auto',
          format: ext.replace('.', '') || undefined,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        },
      );

      stream.end(file.buffer);
    }).catch((error) => {
      throw new BadRequestException(
        this.translate('storage.CLOUDINARY_UPLOAD_FAILED', { message: error.message }),
      );
    });

    return {
      path: result.public_id,
      url: result.secure_url,
      filename: `${publicId}${ext}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async download(
    filename: string,
  ): Promise<{ stream: NodeJS.ReadableStream; metadata: FileMetadata }> {
    // Derive public_id from filename (strip extension)
    const ext = path.extname(filename);
    const publicId = ext ? filename.slice(0, -ext.length) : filename;

    let resource: any;
    try {
      resource = await cloudinary.api.resource(publicId, {
        resource_type: 'auto',
      });
    } catch (error: any) {
      throw this.fileNotFound(filename);
    }

    const url: string = resource.secure_url;
    const metadata: FileMetadata = {
      filename,
      size: resource.bytes ?? 0,
      mimetype: resource.resource_type === 'image'
        ? `image/${resource.format}`
        : `${resource.resource_type}/${resource.format}`,
      url,
      createdAt: resource.created_at ? new Date(resource.created_at) : undefined,
      etag: resource.etag,
    };

    // Fetch the CDN URL and return the response body as a readable stream
    const response = await fetch(url);
    if (!response.ok) {
      throw new NotFoundException(
        this.translate('storage.CLOUDINARY_FETCH_FAILED', { filename }),
      );
    }
    const stream = response.body as unknown as NodeJS.ReadableStream;
    return { stream, metadata };
  }

  async delete(filename: string): Promise<void> {
    const ext = path.extname(filename);
    const publicId = ext ? filename.slice(0, -ext.length) : filename;

    try {
      const result = await cloudinary.api.delete_resources([publicId], {
        resource_type: 'auto',
      });
      // If the public_id was not found, Cloudinary returns it under 'not_found'
      if (result?.not_found && result.not_found.includes(publicId)) {
        throw this.fileNotFound(filename);
      }
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        this.translate('storage.CLOUDINARY_DELETE_FAILED', { message: error.message }),
      );
    }
  }

  async list(prefix?: string, limit = 50): Promise<FileMetadata[]> {
    const options: Record<string, any> = {
      resource_type: 'auto',
      max_results: limit,
    };
    if (prefix) {
      options.prefix = prefix;
    }

    try {
      const result = await cloudinary.api.resources(options);
      const resources: any[] = result.resources ?? [];

      return resources.map((r: any) => ({
        filename: `${r.public_id}.${r.format}`,
        size: r.bytes ?? 0,
        mimetype: r.resource_type === 'image'
          ? `image/${r.format}`
          : `${r.resource_type}/${r.format}`,
        url: r.secure_url,
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        etag: r.etag,
      }));
    } catch (error: any) {
      throw new BadRequestException(
        this.translate('storage.CLOUDINARY_LIST_FAILED', { message: error.message }),
      );
    }
  }

  async exists(filename: string): Promise<boolean> {
    const ext = path.extname(filename);
    const publicId = ext ? filename.slice(0, -ext.length) : filename;
    try {
      await cloudinary.api.resource(publicId, { resource_type: 'auto' });
      return true;
    } catch {
      return false;
    }
  }

  async getMetadata(filename: string): Promise<FileMetadata> {
    const ext = path.extname(filename);
    const publicId = ext ? filename.slice(0, -ext.length) : filename;

    let resource: any;
    try {
      resource = await cloudinary.api.resource(publicId, {
        resource_type: 'auto',
      });
    } catch (error: any) {
      throw this.fileNotFound(filename);
    }

    return {
      filename,
      size: resource.bytes ?? 0,
      mimetype: resource.resource_type === 'image'
        ? `image/${resource.format}`
        : `${resource.resource_type}/${resource.format}`,
      url: resource.secure_url,
      createdAt: resource.created_at ? new Date(resource.created_at) : undefined,
      etag: resource.etag,
    };
  }
}
