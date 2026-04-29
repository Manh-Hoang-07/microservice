import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ContentTemplateExecutionService } from '../../content-template/services/content-template-execution.service';

@Processor('notification')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly templateService: ContentTemplateExecutionService,
  ) {}

  @Process({ name: 'send_email_template', concurrency: 5 })
  async handleSendEmail(job: Job) {
    const { templateCode, options } = job.data;
    this.logger.log(`Processing email job: ${templateCode} → ${options.to}`);

    try {
      await this.templateService.execute(templateCode, options);
      this.logger.log(`Email sent: ${templateCode} → ${options.to}`);
    } catch (err) {
      this.logger.error(`Failed email job: ${templateCode} → ${options.to}`, err);
      throw err; // Let Bull retry
    }
  }
}
