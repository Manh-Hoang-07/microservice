import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { WardService } from '../../admin/services/ward.service';
import { Public } from '@package/common';

@Controller()
export class PublicWardController {
  constructor(private readonly wardService: WardService) {}

  @Public()
  @Get('wards')
  async getList(@Query() query: any) {
    return this.wardService.getList(query);
  }

  @Public()
  @Get('provinces/:provinceId/wards')
  async getByProvince(
    @Param('provinceId') provinceId: string,
    @Query() query: any,
  ) {
    return this.wardService.getList({ ...query, province_id: provinceId });
  }
}
