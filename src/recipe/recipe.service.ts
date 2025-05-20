import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { OrderType } from 'src/types/order.type';
import { TagService } from './services/tag.service';
import { AiAssistanceService } from './services/aiAssistance.service';
import { QueryBuilderFacade } from './utils/queryBuilder.facade';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
    private readonly tagService: TagService,
    private readonly aiAssistanceService: AiAssistanceService,
  ) {}

  public async findAll(
    sortBy: string,
    order: OrderType,
    limit: number,
    page: number,
    tags: string[],
    search: string,
  ) {
    const [recipes, total] = await new QueryBuilderFacade<Recipe>(
      this.recipeRepo.createQueryBuilder('recipe'),
    )
      .leftJoinAndSelect('recipe.tags', 'tag')
      .addTagsQuery(tags)
      .addSearchQuery(
        await this.aiAssistanceService.generateSearchKeywords(search),
      )
      .orderBy(`recipe.${sortBy}`, order)
      .skipToBy(page, limit)
      .get();

    const mappedRecipes = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      imgUrl: recipe.imgUrl,
      tags: recipe.tags,
    }));

    return {
      recipes: mappedRecipes,
      total,
    };
  }

  public async generateRecipe(prompt: string): Promise<{ id: string }> {
    const recipe: CreateRecipeDto | undefined =
      await this.aiAssistanceService.generate(prompt);
    if (!recipe) {
      throw new Error('Failed to generate recipe');
    }
    const newRecipe: Recipe = await this.create(recipe);

    return { id: newRecipe.id };
  }

  public async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { title, description, imgUrl, ingredients, instructions } =
      createRecipeDto;
    const recipe = this.recipeRepo.create({
      title,
      description,
      imgUrl,
      ingredients,
      instructions,
    });

    recipe.tags = await this.tagService.create(createRecipeDto.tags);

    return this.recipeRepo.save(recipe);
  }

  public createMultiple(createRecipeDtos: CreateRecipeDto[]) {
    return Promise.all(
      createRecipeDtos.map((createRecipeDto) => this.create(createRecipeDto)),
    );
  }

  public async findOne(id: string) {
    const recipe = await this.recipeRepo.findOne({
      where: { id },
      relations: ['tags'],
      select: {
        id: true,
        title: true,
        description: true,
        imgUrl: true,
        ingredients: true,
        instructions: true,
        tags: true,
        createdAt: false,
      },
    });
    if (!recipe) {
      return null;
    }
    return {
      ...recipe,
      instructions: recipe.instructions.map(
        (instruction) => instruction.description,
      ),
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    };
  }

  public update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, { ...updateRecipeDto });
  }

  public remove(id: string) {
    return this.recipeRepo.delete(id);
  }
}
