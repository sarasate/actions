import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Action } from './entities/action.entity';
import { ActionsResolver } from './actions.resolver';
import { OpenAIModule } from '../open-ai/open-ai.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Action] }), OpenAIModule],
  providers: [ActionsService, ActionsResolver],
  exports: [ActionsService],
})
export class ActionsModule {}
