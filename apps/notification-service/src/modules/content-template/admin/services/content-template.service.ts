import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ContentTemplateRepository } from '../../repositories/content-template.repository';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';

@Injectable()
export class AdminContentTemplateService {
  constructor(
    private readonly templateRepo: ContentTemplateRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.category) where.category = query.category;
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.templateRepo.findMany(where, options),
      this.templateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const lang = I18nContext.current()?.lang;
    const template = await this.templateRepo.findById(id);
    if (!template) throw new NotFoundException(this.i18n.t('content-template.NOT_FOUND', { lang }));
    return template;
  }

  async create(dto: CreateContentTemplateDto) {
    const lang = I18nContext.current()?.lang;
    const existing = await this.templateRepo.findByCode(dto.code);
    if (existing) throw new BadRequestException(this.i18n.t('content-template.CODE_EXISTS', { lang }));
    return this.templateRepo.create(dto as any);
  }

  async update(id: PrimaryKey, dto: UpdateContentTemplateDto) {
    const lang = I18nContext.current()?.lang;
    await this.getOne(id);
    if (dto.code) {
      const existing = await this.templateRepo.findFirst({ code: dto.code, id: { not: id } });
      if (existing) throw new BadRequestException(this.i18n.t('content-template.CODE_EXISTS', { lang }));
    }
    return this.templateRepo.update(id, dto as any);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.templateRepo.delete(id);
    return { success: true };
  }
}
