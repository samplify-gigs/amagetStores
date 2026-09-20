import { IsNumber, IsNotEmpty, IsPositive, IsInt, Min } from 'class-validator';

export class FetchCategoryProductsDto {
  @IsNotEmpty({ message: 'categoryId is required' })
  @IsNumber({}, { message: 'categoryId must be a valid number' })
  @IsInt({ message: 'categoryId must be an integer' })
  @IsPositive({ message: 'categoryId must be a positive number' })
  categoryId!: number;

  @IsNotEmpty({ message: 'offset is required' })
  @IsNumber({}, { message: 'offset must be a valid number' })
  @IsInt({ message: 'offset must be an integer' })
  @Min(0, { message: 'offset cannot be negative' })
  offset!: number;
}
