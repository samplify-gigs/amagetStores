import { Body, Controller, Post } from '@nestjs/common';
import { CartValidationService } from './cart-validation.service';

@Controller('inserting-user-id')
export class CartValidationController {
  constructor(private readonly CartValidate: CartValidationService) {}

  @Post()
  InsertUserId(@Body() body: any) {
    return this.CartValidate.validateCartCreation(body);
  }
}
