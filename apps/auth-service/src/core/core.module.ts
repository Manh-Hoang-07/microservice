import { Global, Module } from '@nestjs/common';
import { FileLogger } from '@package/bootstrap';
import { PrismaService } from './database/prisma.service';
import { TokenBlacklistService } from './security/services/token-blacklist.service';
import { AttemptLimiterService } from './security/services/attempt-limiter.service';
import { IamClient } from '../clients/iam.client';

@Global()
@Module({
  providers: [
    PrismaService,
    TokenBlacklistService,
    AttemptLimiterService,
    FileLogger,
    IamClient,
  ],
  exports: [
    PrismaService,
    TokenBlacklistService,
    AttemptLimiterService,
    FileLogger,
    IamClient,
  ],
})
export class CoreModule {}
