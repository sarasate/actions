import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('deleteMemberPayload')
export class RemoveActionPayload {
  @Field()
  readonly success: boolean;
}
