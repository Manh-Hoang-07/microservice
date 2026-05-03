import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class PublicCategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAll() {
    const data = await this.categoryRepo.findAll();
    return { data };
  }
}
