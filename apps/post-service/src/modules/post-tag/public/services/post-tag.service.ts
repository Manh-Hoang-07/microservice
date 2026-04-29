import { Injectable } from '@nestjs/common';
import { PostTagRepository } from '../../repositories/post-tag.repository';

@Injectable()
export class PublicPostTagService {
  constructor(private readonly tagRepo: PostTagRepository) {}

  async getAll() {
    const data = await this.tagRepo.findAllActive();
    return { data };
  }
}
