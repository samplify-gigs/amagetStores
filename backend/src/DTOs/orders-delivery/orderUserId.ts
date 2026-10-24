import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class createOrderUserid {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1000)
  userId!: number;
}
