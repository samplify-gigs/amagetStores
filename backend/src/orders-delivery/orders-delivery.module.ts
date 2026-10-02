import { Module } from '@nestjs/common';
import { OrdersDeliveryController } from './orders-delivery.controller';
import { OrdersDeliveryService } from './orders-delivery.service';

@Module({
  controllers: [OrdersDeliveryController],
  providers: [OrdersDeliveryService]
})
export class OrdersDeliveryModule {}
