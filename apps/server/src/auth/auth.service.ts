import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return this.validatePassword(user, pass) ? user : null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOneByEmail(loginUserInput.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload, { secret: 'secret' }),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    let user = await this.usersService.findOneByEmail(createUserDto.email);
    if (user) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  validatePassword(user: User, password: string) {
    const persistedPassword = user?.password;
    return persistedPassword
      ? bcrypt.compare(password, persistedPassword)
      : false;
  }
}
