import { PartialType } from '@nestjs/mapped-types';
import { CreateBannerLocationDto } from './create-banner-location.dto';

export class UpdateBannerLocationDto extends PartialType(CreateBannerLocationDto) {}
