import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { env } from 'process';
import { getSearchPrompt } from '../../utils/getSearchPrompt';

@Injectable()
export class DeepseekService {
  private openAi = new OpenAI({
    baseURL: env.OPENAI_API_URL,
    apiKey: env.DEEPSEEK_API_KEY,
  });

  public async generate(search: string, tags: string[]) {
    const content = getSearchPrompt(search, tags);
    const { choices } = await this.openAi.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    if (!choices[0].message.content) {
      return null;
    }

    let recipe: string = choices[0].message.content?.replaceAll('```', '');
    recipe = recipe.replaceAll('json', '');
    let recipeObj: unknown;

    try {
      recipeObj = JSON.parse(recipe);
    } catch (error) {
      console.log(error);
    }

    return recipeObj;
  }
}
