import { PrismaService } from '../../database/prisma.service';
import { ContentRendererService } from './content-renderer.service';
import { MailService } from '../../mail/mail.service';
export declare class ContentTemplateExecutionService {
    private readonly prisma;
    private readonly renderer;
    private readonly mail;
    private readonly logger;
    constructor(prisma: PrismaService, renderer: ContentRendererService, mail: MailService);
    execute(code: string, options: {
        to: string | string[];
        variables: Record<string, any>;
        subject?: string;
    }): Promise<void>;
}
