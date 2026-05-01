import { Injectable } from '@nestjs/common';
import { TagRepository } from '../../repositories/tag.repository';

@Injectable()
export class PublicTagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async getAll() {
    const data = await this.tagRepo.findAllActive();
    return { data };
  }
}
