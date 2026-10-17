import { Module } from '@nestjs/common';
import { OrdersDeliveryController } from './delivery-locations-fetch/orders-delivery.controller';
import { OrdersDeliveryService } from './delivery-locations-fetch/orders-delivery.service';
import { CartValidationController } from './adding-to-cart/adding-to-cart.controller';
import { CartValidationService } from './adding-to-cart/adding-to-cart.service';

@Module({
  controllers: [OrdersDeliveryController, CartValidationController],
  providers: [OrdersDeliveryService, CartValidationService]
})
export class OrdersDeliveryModule {}
