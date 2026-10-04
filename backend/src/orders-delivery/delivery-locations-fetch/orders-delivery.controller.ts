import { Controller, Get } from '@nestjs/common';
import { OrdersDeliveryService } from './orders-delivery.service';

@Controller('orders-delivery')
export class OrdersDeliveryController {
  constructor(private readonly fetchDeliveryOptions: OrdersDeliveryService) {}

  @Get('')
  async fetchItems() {
    return this.fetchDeliveryOptions.fetchLocationDetails();
  }
}
