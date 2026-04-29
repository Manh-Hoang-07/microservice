import { BadRequestException } from '@nestjs/common';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 100;

export class ImageValidator {
  static validate(file: any): void {
    if (!file) throw new BadRequestException('File is required');
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type: ${file.mimetype}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: 10MB`);
    }
  }

  static validateMultiple(files: any[]): void {
    if (!files?.length) throw new BadRequestException('At least one file is required');
    if (files.length > MAX_FILES) throw new BadRequestException(`Too many files. Max: ${MAX_FILES}`);
    for (const file of files) this.validate(file);
  }
}
