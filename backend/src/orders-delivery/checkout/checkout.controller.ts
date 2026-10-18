import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from 'src/DTOs/orders-delivery/checkoutDto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout-validate')
  checkoutItems(@Body(new ValidationPipe()) body: CheckoutDto) {
    return this.checkoutService.CheckoutDetails(body);
  }
}
