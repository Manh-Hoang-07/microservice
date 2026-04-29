export declare enum TemplateType {
    email = "email",
    telegram = "telegram",
    zalo = "zalo",
    sms = "sms"
}
export declare enum TemplateCategory {
    render = "render",
    file = "file"
}
export declare class CreateContentTemplateDto {
    code: string;
    name: string;
    category?: TemplateCategory;
    type: TemplateType;
    content?: string;
    file_path?: string;
    metadata?: any;
    variables?: any;
}
