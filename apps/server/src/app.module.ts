import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionsModule } from './actions/actions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './open-ai/open-ai.module';
import configuration from './config/configuration';

const Config = ConfigModule.forRoot({
  load: [configuration],
  isGlobal: true,
  envFilePath: '.env',
});

@Module({
  imports: [
    Config,
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    ActionsModule,
    AuthModule,
    UsersModule,
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
