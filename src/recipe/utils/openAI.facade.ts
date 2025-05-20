import OpenAI from 'openai';
import { env } from 'process';
import { Models } from 'src/utils/models.enum';

export class OpenAiFacade {
  private openAi: OpenAI;

  constructor(apiKey: string | undefined) {
    this.openAi = new OpenAI({
      apiKey,
      baseURL: env.OPENAI_API_URL,
    });
  }

  public async chatCompletion(
    model: Models,
    messages: OpenAI.ChatCompletionMessageParam[],
  ): Promise<OpenAI.ChatCompletion> {
    return await this.openAi.chat.completions.create({
      model,
      messages,
    });
  }
}
