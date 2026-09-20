import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FetchCategoryProductsDto } from 'src/DTOs/category/category-items';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('pagination')
  test(@Body() body: FetchCategoryProductsDto) {
    return this.categoryService.fetchCategoryProducts(body);
  }
}
