import { Module } from '@nestjs/common';
import { OrdersDeliveryController } from './delivery-locations-fetch/orders-delivery.controller';
import { OrdersDeliveryService } from './delivery-locations-fetch/orders-delivery.service';
import { CartValidationController } from './adding-to-cart/adding-to-cart.controller';
import { CartValidationService } from './adding-to-cart/adding-to-cart.service';
import { CheckoutController } from './checkout/checkout.controller';
import { CheckoutService } from './checkout/checkout.service';
import { OrderController } from './orders/orders.controller';
import { OrdersFeeService } from './orders/orders.service';

@Module({
  controllers: [
    OrdersDeliveryController,
    CartValidationController,
    CheckoutController,
    OrderController,
  ],
  providers: [
    OrdersDeliveryService,
    CartValidationService,
    CheckoutService,
    OrdersFeeService,
  ],
})
export class OrdersDeliveryModule {}
