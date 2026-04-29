import { ConfigService } from '@nestjs/config';
export interface SendMailOptions {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
}
export declare class MailService {
    private readonly config;
    private readonly logger;
    private transporter;
    constructor(config: ConfigService);
    send(options: SendMailOptions): Promise<void>;
}
