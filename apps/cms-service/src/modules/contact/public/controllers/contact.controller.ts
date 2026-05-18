import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '@package/common';
import { Throttle } from '@nestjs/throttler';
import { PublicContactService } from '../services/contact.service';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';

@Controller('public/contacts')
export class PublicContactController {
  constructor(private readonly contactService: PublicContactService) {}

  // Tight per-IP rate limit on the public contact form. Without this, an
  // attacker can flood the contacts table and the outbox topic, drowning
  // legitimate submissions and inflating storage cost.
  @Public()
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post()
  async create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
}
