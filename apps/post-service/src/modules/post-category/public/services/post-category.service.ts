import { Injectable } from '@nestjs/common';
import { PostCategoryRepository } from '../../repositories/post-category.repository';

@Injectable()
export class PublicPostCategoryService {
  constructor(private readonly categoryRepo: PostCategoryRepository) {}

  async getAll() {
    const data = await this.categoryRepo.findAllActive();
    return { data };
  }
}
