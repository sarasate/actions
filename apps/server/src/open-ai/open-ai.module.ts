import { Module } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import { OpenAiResolver } from './open-ai.resolver';

@Module({
  providers: [OpenAIService, OpenAiResolver],
  exports: [OpenAIService],
})
export class OpenAIModule {}
