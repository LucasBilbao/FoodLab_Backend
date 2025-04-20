import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  title: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  imgUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  instructions: CreateInstructionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];
}

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  unit: string;
}

export class CreateInstructionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  description: string;
}

export class CreateTagDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
