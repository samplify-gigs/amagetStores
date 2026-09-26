import { IsInt, IsPositive, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ProductsPagesDto {
  @IsNotEmpty({ message: 'legacyProductId is required' })
  @IsNumber({}, { message: 'legacyProductId must be a valid number' })
  @IsInt({ message: 'legacyProductId must be an integer' })
  @IsPositive({ message: 'legacyProductId must be a positive number' })
  @Min(1000)
  legacyProductId!: number;
}
