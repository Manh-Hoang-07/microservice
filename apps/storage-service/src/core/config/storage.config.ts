import { registerAs } from '@nestjs/config';

import * as os from 'os';
import * as path from 'path';

export default registerAs('storage', () => ({
  type: process.env.STORAGE_TYPE || 'local',
  maxFileSize: parseInt(process.env.STORAGE_MAX_FILE_SIZE || '10485760', 10),
  allowedFileTypes: process.env.STORAGE_ALLOWED_FILE_TYPES || undefined,
  // Thư mục ghi file tạm trong lúc multer nhận upload (diskStorage). Mỗi
  // request được stream xuống đĩa thay vì nạp trọn vào RAM, tránh OOM khi
  // upload nhiều file / concurrency cao. Mặc định dùng tmpdir của OS.
  tempDir: process.env.STORAGE_TEMP_DIR || path.join(os.tmpdir(), 'storage-uploads'),
  local: {
    destination: process.env.VERCEL ? '/tmp/uploads' : (process.env.STORAGE_LOCAL_PATH || './storage/uploads'),
    baseUrl: process.env.STORAGE_LOCAL_BASE_URL || '/api/upload',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  s3: {
    region: process.env.STORAGE_S3_REGION || 'us-east-1',
    bucket: process.env.STORAGE_S3_BUCKET || '',
    accessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY || '',
    endpoint: process.env.STORAGE_S3_ENDPOINT || '',
    baseUrl: process.env.STORAGE_S3_BASE_URL || '',
    forcePathStyle: (process.env.STORAGE_S3_FORCE_PATH_STYLE || 'true').toLowerCase() === 'true',
  },
}));
