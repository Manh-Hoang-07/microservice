import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ContentRendererService } from './content-renderer.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ContentTemplateExecutionService {
  private readonly logger = new Logger(ContentTemplateExecutionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly renderer: ContentRendererService,
    private readonly mail: MailService,
  ) {}

  async execute(
    code: string,
    options: {
      to: string | string[];
      variables: Record<string, any>;
      subject?: string;
    },
  ): Promise<void> {
    const template = await this.prisma.contentTemplate.findFirst({
      where: { code, status: 'active', category: 'render' },
    });

    if (!template) {
      this.logger.warn(`Template not found or inactive: ${code}`);
      throw new NotFoundException(`Template not found: ${code}`);
    }

    if (!template.content) {
      this.logger.warn(`Template has no content: ${code}`);
      return;
    }

    const renderedContent = this.renderer.render(template.content, options.variables);

    // Determine subject
    const metadata = template.metadata as any;
    const subject = options.subject || metadata?.subject || template.name;

    if (template.type === 'email') {
      await this.mail.send({
        to: options.to,
        subject,
        html: renderedContent,
      });
    } else {
      this.logger.log(`Template type "${template.type}" not yet supported for dispatch`);
    }
  }
}
