import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'Phone number must be exactly 11 digits',
  })
  @Matches(/^0[789][01]\d{8}$/, {
    message: 'Enter a valid Nigerian phone number',
  })
  phoneNo!: string;

  @IsString()
  @IsNotEmpty()
  orderNumber!: string;
}
