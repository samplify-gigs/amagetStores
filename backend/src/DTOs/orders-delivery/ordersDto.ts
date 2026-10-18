import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class OrderItemDto {
  @IsInt()
  productId!: number;
  @IsInt()
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsInt()
  @IsPositive()
  stateId!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  deliveryOptionId!: number;

 
}
