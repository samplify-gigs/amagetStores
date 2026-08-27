import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('pagination')
  test(@Body() body: { offset: number }) {
    return this.categoryService.test(body);
  }
}
