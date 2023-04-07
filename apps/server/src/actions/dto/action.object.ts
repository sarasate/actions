import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActionObject {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  priority: number;

  @Field()
  dueDate: Date;

  @Field(() => [String])
  tags: string[];
}
