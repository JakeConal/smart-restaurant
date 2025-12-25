import { Module } from '@nestjs/common';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from '../schema/menu-item.schema';
import { MenuCategory } from '../schema/menu-category.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, MenuCategory]), AuthModule],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
