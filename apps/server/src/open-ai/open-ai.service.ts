import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  constructor(private readonly configService: ConfigService) {}

  async generateAction(text: string): Promise<any> {
    const prompt = `create a task with due date (in the future from today), priority and output a JSON string for: ${text}. The result should be in this form: {"name":"string", "dueDate": "date", "priority": number, |tags": ["string"]}`;

    const result = await this.generateText(prompt);

    return JSON.parse(result.replace(/\n/g, ''));
  }

  async generateText(text: string, options?) {
    const requestOptions = {
      model: 'text-davinci-003',
      prompt: text,
      max_tokens: 2048,
      // messages: [
      //   {
      //     role: 'system',
      //     content: text,
      //   },
      // ],
      // max_tokens: 500,
      // n: 1,
      // stop: null,
      temperature: 0.7,
      ...options,
    };

    const configuration = new Configuration({
      apiKey: this.configService.get('openai.apiKey'),
    });

    const openai = new OpenAIApi(configuration);
    try {
      const result = await openai.createCompletion(requestOptions);
      return result.data.choices[0].text;
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
