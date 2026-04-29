import { Injectable } from '@nestjs/common';
import { ComicCategoryRepository } from '../../repositories/comic-category.repository';

@Injectable()
export class PublicCategoryService {
  constructor(private readonly categoryRepo: ComicCategoryRepository) {}

  async getAll() {
    const data = await this.categoryRepo.findAll();
    return { data };
  }
}
