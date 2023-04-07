import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OpenAIService } from './open-ai.service';

@Resolver()
export class OpenAiResolver {
  constructor(private readonly openAIService: OpenAIService) {}

  @Mutation(() => String)
  async generateText(@Args({ name: 'text', type: () => String }) text: string) {
    return await this.openAIService.generateText(text);
  }
}
