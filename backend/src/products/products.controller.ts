import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsPagesDto } from 'src/DTOs/ProductsPage/productsPage';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  fetchProducts(@Body() body: ProductsPagesDto) {
    return this.productsService.fetchProductDetails(body);
  }
}
