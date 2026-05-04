import { Injectable } from '@nestjs/common';
import { PUBLIC_COMIC_STATUSES } from '../../comic/enums/comic-status.enum';
import { HomepageRepository } from '../repositories/homepage.repository';

@Injectable()
export class HomepageService {
  constructor(private readonly homepageRepo: HomepageRepository) {}

  async getTopViewed(limit: number) {
    return this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { stats: { view_count: 'desc' } }, limit);
  }

  async getPopular(limit: number) {
    return this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { stats: { follow_count: 'desc' } }, limit);
  }

  async getNewest(limit: number) {
    return this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { created_at: 'desc' }, limit);
  }

  async getRecentlyUpdated(limit: number) {
    return this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { last_chapter_updated_at: 'desc' }, limit);
  }

  async getCategories() {
    return this.homepageRepo.findCategories();
  }
}
