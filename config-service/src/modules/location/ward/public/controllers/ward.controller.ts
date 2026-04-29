import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WardService } from '../../admin/services/ward.service';
import { Public } from '../../../../../common/permission.decorator';

@ApiTags('Location - Wards')
@ApiBearerAuth('access-token')
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
