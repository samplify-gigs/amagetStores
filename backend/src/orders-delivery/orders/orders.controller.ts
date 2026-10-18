import { Controller, Get } from '@nestjs/common';
import { OrdersFeeService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly getFullDeliveryItems: OrdersFeeService) {}

  @Get('get-delivery-details-fee')
  getOrderDeliveryLocations() {
    return this.getFullDeliveryItems.getDeliveryFee();
  }
}
