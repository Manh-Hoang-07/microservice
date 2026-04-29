import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { AdminNotificationService } from '../../notification/admin/services/notification.service';
import { Queue } from 'bull';
export declare class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly config;
    private readonly prisma;
    private readonly notifService;
    private readonly notifQueue;
    private readonly logger;
    private consumer;
    constructor(config: ConfigService, prisma: PrismaService, notifService: AdminNotificationService, notifQueue: Queue);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private handleMessage;
    private handleChapterPublished;
    private handleCommentCreated;
    private handleUserFollowed;
    private handleUserUnfollowed;
    private handleUserRegistered;
    private handlePasswordReset;
    private handleContactSubmitted;
    private handlePostCommentCreated;
}
