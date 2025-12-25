import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';
import { MenuCategory } from '../schema/menu-category.schema';
@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
