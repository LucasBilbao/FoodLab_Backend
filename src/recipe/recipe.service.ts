import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { OrderType } from 'src/types/order.type';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  findAll(sortBy: string, order: OrderType) {
    return this.recipeRepo.find({
      order: { [sortBy]: order },
      select: {
        title: true,
        description: true,
        imgUrl: true,
      },
    });
  }

  public create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipeRepo.create(createRecipeDto);
    return this.recipeRepo.save(recipe);
  }

  public findOne(id: string) {
    return this.recipeRepo.findOneBy({ id });
  }

  public update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, { ...updateRecipeDto });
  }

  remove(id: string) {
    return this.recipeRepo.delete(id);
  }
}
