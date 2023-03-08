import { Query, Resolver } from '@nestjs/graphql';
import { ActionsService } from './actions.service';
import { Action } from './entities/action.entity';

@Resolver()
export class ActionsResolver {
  constructor(private readonly actionsService: ActionsService) {}
  @Query(() => [Action])
  async actions() {
    const actions = await this.actionsService.findAll();
    return actions;
  }
}
