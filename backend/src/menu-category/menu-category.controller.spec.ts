import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoryController } from './menu-category.controller';

describe('MenuCategoryController', () => {
  let controller: MenuCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoryController],
    }).compile();

    controller = module.get<MenuCategoryController>(MenuCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
