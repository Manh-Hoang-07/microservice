import { Module } from '@nestjs/common';
import { StorageHealthController } from './health.controller';

@Module({ controllers: [StorageHealthController] })
export class StorageHealthModule {}
