import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
export declare class OutboxRelayService {
    private readonly prisma;
    private readonly config;
    private readonly logger;
    private producer;
    private intervalRef;
    constructor(prisma: PrismaService, config: ConfigService);
    private startPolling;
    relayOutbox(): Promise<void>;
    private getTopicForEvent;
}
