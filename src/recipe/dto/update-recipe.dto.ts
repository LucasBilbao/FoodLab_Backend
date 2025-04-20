import { PartialType } from '@nestjs/mapped-types';
import {
  CreateIngredientDto,
  CreateInstructionDto,
  CreateRecipeDto,
} from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}

export class UpdateInstructionDto extends PartialType(CreateInstructionDto) {}
