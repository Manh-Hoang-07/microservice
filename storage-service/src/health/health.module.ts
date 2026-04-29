import { Module } from '@nestjs/common';
import { StorageHealthController } from './controllers/health.controller';

@Module({ controllers: [StorageHealthController] })
export class StorageHealthModule {}
