import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicContactService } from '../services/contact.service';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';

@ApiTags('Public Contacts')
@Controller('public/contacts')
export class PublicContactController {
  constructor(private readonly contactService: PublicContactService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
}
