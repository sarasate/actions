import { Field, ObjectType } from '@nestjs/graphql';

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

  @Field(() => [String], { nullable: true })
  tags: string[];
}
