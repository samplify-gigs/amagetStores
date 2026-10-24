import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersFeeService } from './orders.service';
import { createOrderUserid } from 'src/DTOs/orders-delivery/orderUserId';

@Controller('orders')
export class OrderController {
  constructor(private readonly getFullDeliveryItems: OrdersFeeService) {}

  @Get('get-delivery-details-fee')
  getOrderDeliveryLocations() {
    return this.getFullDeliveryItems.getDeliveryFee();
  }

  @Post('get-total-price')
  getTotalPrice(@Body() body: createOrderUserid) {
    return this.getFullDeliveryItems.getOrderDetailesUserid(body);
  }
}
