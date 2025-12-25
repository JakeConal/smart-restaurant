import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuCategoryDto } from 'src/dto/create-menu-category.dto';
import { MenuCategory, CategoryStatus } from 'src/schema/menu-category.schema';
import { Repository } from 'typeorm';
import { UpdateMenuCategoryDto } from 'src/dto/update-menu-category.dto';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly CategoryRepo: Repository<MenuCategory>,
  ) {}

  async create(restaurantId: string, dto: CreateMenuCategoryDto) {
    const exists = await this.CategoryRepo.findOne({
      where: { restaurantId, name: dto.name },
    });

    if (exists) {
      throw new Error('Category with this name already exists');
    }

    const category = this.CategoryRepo.create({
      restaurantId,
      ...dto,
    });

    return this.CategoryRepo.save(category);
  }

  async findAll(restaurantId: string) {
    return this.CategoryRepo.find({
      where: { restaurantId },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async update(id: string, restaurantId: string, dto: UpdateMenuCategoryDto) {
    const category = await this.CategoryRepo.findOne({
      where: { id, restaurantId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (dto.name && dto.name !== category.name) {
      const nameExists = await this.CategoryRepo.findOne({
        where: { restaurantId, name: dto.name },
      });

      if (nameExists) {
        throw new BadRequestException('Category name already exists');
      }
    }

    Object.assign(category, dto);
    return this.CategoryRepo.save(category);
  }

  async deactivate(id: string, restaurantId: string) {
    const category = await this.CategoryRepo.findOne({
      where: { id, restaurantId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.status = CategoryStatus.INACTIVE;
    return this.CategoryRepo.save(category);
  }
}
