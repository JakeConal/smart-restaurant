import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoryService } from './menu-category.service';

describe('MenuCategoryService', () => {
  let service: MenuCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCategoryService],
    }).compile();

    service = module.get<MenuCategoryService>(MenuCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
