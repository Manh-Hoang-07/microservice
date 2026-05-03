import { Module } from '@nestjs/common';
import { AdminContactController } from './admin/controllers/contact.controller';
import { AdminContactService } from './admin/services/contact.service';
import { PublicContactController } from './public/controllers/contact.controller';
import { PublicContactService } from './public/services/contact.service';
import { ContactRepository } from './repositories/contact.repository';

@Module({
  controllers: [AdminContactController, PublicContactController],
  providers: [ContactRepository, AdminContactService, PublicContactService],
})
export class ContactModule {}
