import { PartialType } from '@nestjs/mapped-types';
import {
  CreateIngredientDto,
  CreateInstructionDto,
  CreateRecipeDto,
} from './create-recipe.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiPropertyOptional()
  unit?: string;
}

export class UpdateInstructionDto extends PartialType(CreateInstructionDto) {
  @ApiPropertyOptional()
  description?: string;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  imgUrl?: string;

  @ApiPropertyOptional({ type: [CreateIngredientDto] })
  ingredients?: CreateIngredientDto[];

  @ApiPropertyOptional({ type: [CreateInstructionDto] })
  instructions?: CreateInstructionDto[];
}
