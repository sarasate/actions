import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  constructor(private readonly configService: ConfigService) {}

  async generateText(text: string, options?) {
    const requestOptions = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
      // max_tokens: 500,
      // n: 1,
      // stop: null,
      temperature: 1,
      ...options,
    };

    const configuration = new Configuration({
      apiKey: this.configService.get('openai.apiKey'),
    });

    const openai = new OpenAIApi(configuration);
    try {
      const result = await openai.createChatCompletion(requestOptions);
      return result.data.choices[0].message.content;
    } catch (error) {
      console.log(
        '%copenai.service.ts line:38 error',
        'color: #007acc;',
        error,
      );
      throw new Error(`Error generating text: ${error.message}`);
    }
  }
}
