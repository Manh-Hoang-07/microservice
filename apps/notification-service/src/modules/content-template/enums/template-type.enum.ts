export enum TemplateType {
  email = 'email',
  telegram = 'telegram',
  zalo = 'zalo',
  sms = 'sms',
}

export const TemplateTypeOptions = [
  { id: TemplateType.email, name: 'Email' },
  { id: TemplateType.telegram, name: 'Telegram' },
  { id: TemplateType.zalo, name: 'Zalo' },
  { id: TemplateType.sms, name: 'SMS' },
];
