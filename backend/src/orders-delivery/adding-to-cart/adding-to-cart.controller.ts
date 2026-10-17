import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CartValidationService } from './adding-to-cart.service';
import { CreateCartDTO } from 'src/DTOs/orders-delivery/createcartDto';

@Controller('cart-items')
export class CartValidationController {
  constructor(private readonly CartValidate: CartValidationService) {}

  @Post('insert-into-cart')
  InsertUserId(@Body(new ValidationPipe()) body: CreateCartDTO) {
    return this.CartValidate.validateCartCreation(body);
  }
}
