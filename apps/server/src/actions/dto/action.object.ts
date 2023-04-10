import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActionStatus } from '../entities/action.entity';

@ObjectType()
export class ActionObject {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  priority: number;

  @Field({ nullable: true })
  dueDate: Date;

  @Field()
  status: ActionStatus;

  @Field(() => [String], { nullable: true })
  tags: string[];
}

registerEnumType(ActionStatus, {
  name: 'ActionStatus',
});
