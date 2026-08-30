import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SearchItemsDto {
  @IsString()
  @IsNotEmpty({
    message: 'search query can not be empty',
  })
  @MinLength(2, {
    message: 'search query must be at least 2 characters',
  })
  @Matches(/.*[a-zA-Z].*/, {
    message: 'search query must contain at least one letter',
  })
  searchQuery: string;
}
