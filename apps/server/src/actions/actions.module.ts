import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Action } from './entities/action.entity';
import { ActionsResolver } from './actions.resolver';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Action] })],
  controllers: [ActionsController],
  providers: [ActionsService, ActionsResolver],
  exports: [ActionsService],
})
export class ActionsModule {}
