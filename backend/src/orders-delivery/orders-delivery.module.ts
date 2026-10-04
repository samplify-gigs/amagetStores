import { Module } from '@nestjs/common';
import { OrdersDeliveryController } from './delivery-locations-fetch/orders-delivery.controller';
import { OrdersDeliveryService } from './delivery-locations-fetch/orders-delivery.service';
import { CartValidationController } from './order-cart-validation/cart-validation.controller';
import { CartValidationService } from './order-cart-validation/cart-validation.service';

@Module({
  controllers: [OrdersDeliveryController, CartValidationController],
  providers: [OrdersDeliveryService, CartValidationService]
})
export class OrdersDeliveryModule {}
