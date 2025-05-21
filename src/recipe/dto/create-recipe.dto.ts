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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  quantity: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  @ApiPropertyOptional()
  unit: string;
}

export class CreateInstructionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty()
  description: string;
}

export class CreateTagDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  name: string;
}

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  imgUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  @ApiProperty({ type: [CreateIngredientDto] })
  ingredients: CreateIngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  @ApiProperty({ type: [CreateInstructionDto] })
  instructions: CreateInstructionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  @ApiProperty({ type: [CreateTagDto] })
  tags: CreateTagDto[];
}
