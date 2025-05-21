import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { OrderType } from 'src/types/order.type';
import { TagService } from './services/tag.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { FindAllQueries } from './decorators/findAllQueries.decorator';

@Controller('api/recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly tagService: TagService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  @FindAllQueries()
  public async findAll(
    @Query('sortBy')
    sortBy: string = 'createdAt',
    @Query('order')
    order: OrderType = 'DESC',
    @Query('limit', new ParseIntPipe({ optional: true }))
    limit: number = 10,
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('tags', new ParseArrayPipe({ optional: true }))
    tags: string[] = [],
    @Query('search')
    search: string = '',
  ) {
    return await this.recipeService.findAll(
      sortBy,
      order,
      limit,
      page,
      tags,
      search,
    );
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all tags' })
  public getTags() {
    return this.tagService.getTags();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a recipe by ID' })
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Post('generate-recipe')
  @ApiOperation({ summary: 'Generate a recipe based on a prompt' })
  @ApiBody({
    description: 'Prompt to generate a recipe',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'The prompt to generate a recipe',
        },
      },
    },
  })
  public async generate(
    @Body('prompt') prompt: string,
  ): Promise<{ id: string }> {
    return await this.recipeService.generateRecipe(prompt);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiBody({
    description: 'Recipe data to create a new recipe',
    type: CreateRecipeDto,
  })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Post('multi')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create multiple recipes' })
  @ApiBody({
    description: 'Array of recipe data to create multiple recipes',
    type: [CreateRecipeDto],
  })
  createMultiple(@Body() createRecipeDtos: CreateRecipeDto[]) {
    return this.recipeService.createMultiple(createRecipeDtos);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe by ID' })
  @ApiBody({
    description: 'Recipe data to update a recipe',
    type: UpdateRecipeDto,
  })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a recipe by ID' })
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
