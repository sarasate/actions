import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => Action)
  async createAction(@Args({ name: 'name', type: () => String }) name: string) {
    const action = await this.actionsService.create({ name });
    return action;
  }
}
