import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Instruction } from './entities/instruction.entity';
import { Tag } from './entities/tag.entity';
import { TagService } from './services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient, Instruction, Tag])],
  controllers: [RecipeController],
  providers: [RecipeService, TagService],
})
export class RecipeModule {}
