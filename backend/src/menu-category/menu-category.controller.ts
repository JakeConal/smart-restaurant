import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryDto } from 'src/dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from 'src/dto/update-menu-category.dto';

@Controller('api/admin/menu/categories')
export class MenuCategoryController {
  constructor(private readonly service: MenuCategoryService) {}

  private restaurantId = 'mock-restaurant-id';

  @Post()
  create(@Body() dto: CreateMenuCategoryDto) {
    return this.service.create(this.restaurantId, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll(this.restaurantId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMenuCategoryDto) {
    return this.service.update(id, this.restaurantId, dto);
  }

  @Patch(':id/status')
  deactivate(@Param('id') id: string) {
    return this.service.deactivate(id, this.restaurantId);
  }
}
