export enum CertificateType {
  iso = 'iso',
  quality = 'quality',
  safety = 'safety',
  environment = 'environment',
  other = 'other',
}

export const CertificateTypeOptions = [
  { id: CertificateType.iso, name: 'ISO' },
  { id: CertificateType.quality, name: 'Chất lượng' },
  { id: CertificateType.safety, name: 'An toàn' },
  { id: CertificateType.environment, name: 'Môi trường' },
  { id: CertificateType.other, name: 'Khác' },
];
