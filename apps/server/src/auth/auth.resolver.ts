import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUserPayload } from './dto/login-user.payload';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginUserPayload)
  async login(@Args('input') input: LoginUserInput) {
    return this.authService.login(input);
  }
}
