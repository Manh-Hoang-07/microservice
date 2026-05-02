import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { WardService } from '../../admin/services/ward.service';
import { Public } from '@package/common';
import { ListWardsPublicQueryDto } from '../dtos/list-ward.query.dto';

@Controller()
export class PublicWardController {
  constructor(private readonly wardService: WardService) {}

  @Public()
  @Get('wards')
  async getList(@Query() query: ListWardsPublicQueryDto) {
    return this.wardService.getList({ ...query, status: 'active' });
  }

  @Public()
  @Get('provinces/:provinceId/wards')
  async getByProvince(
    @Param('provinceId') provinceId: string,
    @Query() query: ListWardsPublicQueryDto,
  ) {
    return this.wardService.getList({
      ...query,
      province_id: provinceId,
      status: 'active',
    });
  }
}
