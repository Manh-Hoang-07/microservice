import { Module } from '@nestjs/common';
import { AdminMenuModule } from './admin/menu.module';
import { PublicMenuModule } from './public/menu.module';
import { MenuRepositoryModule } from './menu.repository.module';

@Module({
  imports: [MenuRepositoryModule, AdminMenuModule, PublicMenuModule],
})
export class MenuModule {}
