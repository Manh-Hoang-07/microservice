import { Module } from '@nestjs/common';
import { AdminCertificateController } from './admin/controllers/certificate.controller';
import { AdminCertificateService } from './admin/services/certificate.service';
import { PublicCertificateController } from './public/controllers/certificate.controller';
import { PublicCertificateService } from './public/services/certificate.service';
import { CertificateRepository } from './repositories/certificate.repository';

@Module({
  controllers: [AdminCertificateController, PublicCertificateController],
  providers: [CertificateRepository, AdminCertificateService, PublicCertificateService],
  exports: [CertificateRepository],
})
export class CertificateModule {}
