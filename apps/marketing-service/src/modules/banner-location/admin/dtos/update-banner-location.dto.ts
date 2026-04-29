import { PartialType } from '@nestjs/swagger';
import { CreateBannerLocationDto } from './create-banner-location.dto';

export class UpdateBannerLocationDto extends PartialType(CreateBannerLocationDto) {}
