import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
export declare class OutboxRelayService {
    private readonly prisma;
    private readonly config;
    private readonly logger;
    private producer;
    constructor(prisma: PrismaService, config: ConfigService);
    relayOutbox(): Promise<void>;
    private getTopicForEvent;
}
