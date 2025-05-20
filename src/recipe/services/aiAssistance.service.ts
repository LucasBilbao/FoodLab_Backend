import { Injectable } from '@nestjs/common';
import { OpenAiFacade } from '../utils/openAI.facade';
import { env } from 'process';
import { Models } from 'src/utils/models.enum';
import {
  RECIPE_GENERATION_REQUEST_STRING,
  SEARCH_KEYWORDS_REQUEST_STRING,
} from 'src/utils/constants';
import OpenAI from 'openai';
import { convertChoiceToJson } from 'src/utils/convertChoiceToJson';
import { SearchKeywords } from 'src/interfaces/searchKeywords.interface';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class AiAssistanceService {
  private openAiFacade: OpenAiFacade = new OpenAiFacade(env.OPENAI_API_KEY);

  public async generateSearchKeywords(prompt: string): Promise<string[]> {
    if (prompt.length === 0) {
      return [];
    }
    const content = `${prompt} ${SEARCH_KEYWORDS_REQUEST_STRING}`;
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content,
      },
    ];

    const { choices } = await this.openAiFacade.chatCompletion(
      Models.QWEN,
      messages,
    );

    if (!choices[0].message.content) {
      return [];
    }

    return (
      convertChoiceToJson<SearchKeywords>(choices[0].message.content)
        ?.keywords ?? []
    );
  }

  public async generate(prompt: string): Promise<CreateRecipeDto | undefined> {
    const content = `${prompt} ${RECIPE_GENERATION_REQUEST_STRING}`;
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content,
      },
    ];

    const { choices } = await this.openAiFacade.chatCompletion(
      Models.DEEPSEEK,
      messages,
    );

    if (!choices[0].message.content) {
      return undefined;
    }

    return convertChoiceToJson<CreateRecipeDto>(choices[0].message.content);
  }
}
