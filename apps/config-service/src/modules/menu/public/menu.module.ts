import { Module } from '@nestjs/common';
import { PublicMenuController } from './controllers/menu.controller';
import { PublicMenuService } from './services/menu.service';
import { AdminMenuModule } from '../admin/menu.module';

@Module({
  imports: [AdminMenuModule],
  controllers: [PublicMenuController],
  providers: [PublicMenuService],
})
export class PublicMenuModule {}
