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

@Controller('api/recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly tagService: TagService,
  ) {}

  @Get()
  public async findAll(
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('order') order: OrderType = 'DESC',
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('tags', new ParseArrayPipe({ optional: true })) tags: string[] = [],
    @Query('search') search: string = '',
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

  @Post('generate-recipe')
  public async generate(
    @Body('prompt') prompt: string,
  ): Promise<{ id: string }> {
    return await this.recipeService.generateRecipe(prompt);
  }

  @Get('tags')
  public getTags() {
    return this.tagService.getTags();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Post('multi')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createMultiple(@Body() createRecipeDtos: CreateRecipeDto[]) {
    return this.recipeService.createMultiple(createRecipeDtos);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
