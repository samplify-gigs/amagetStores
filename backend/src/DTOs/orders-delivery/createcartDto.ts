import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDTO {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  productId!: number;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  quantity!: number;
}

export class CreateCartDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1000)
  userId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  items!: CartItemDTO[];
}
