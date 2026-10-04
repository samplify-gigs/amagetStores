import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class CreateCartDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1000)
  userId!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  ProductId!: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity!: number;
}
