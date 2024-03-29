import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from '../../users/user.object';

@ObjectType()
export class LoginUserPayload {
  @Field(() => UserObject)
  user: UserObject;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
