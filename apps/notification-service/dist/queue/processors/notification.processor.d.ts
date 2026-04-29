import { Job } from 'bull';
import { ContentTemplateExecutionService } from '../../content-template/services/content-template-execution.service';
export declare class NotificationProcessor {
    private readonly templateService;
    private readonly logger;
    constructor(templateService: ContentTemplateExecutionService);
    handleSendEmail(job: Job): Promise<void>;
}
