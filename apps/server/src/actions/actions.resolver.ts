import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { User } from '../users/entities/user.entity';
import { ActionsService } from './actions.service';
import { RemoveActionPayload } from './dto/remove-action.payload';
import { Action } from './entities/action.entity';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ActionsResolver {
  constructor(private readonly actionsService: ActionsService) {}
  @Query(() => [Action])
  async actions() {
    const actions = await this.actionsService.findAll();
    return actions;
  }

  @Mutation(() => Action)
  async createAction(
    @CurrentUser() user: User,
    @Args({ name: 'name', type: () => String }) name: string,
  ) {
    const action = await this.actionsService.create({ name }, user);
    return action;
  }

  @Mutation(() => RemoveActionPayload)
  async removeAction(@Args({ name: 'id', type: () => String }) id: string) {
    const action = await this.actionsService.remove(id);
    return { success: true };
  }
}
