import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @Min(21)
  title: string;

  @IsString()
  @MaxLength(1000)
  description: string;
}
