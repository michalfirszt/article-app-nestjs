import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthController,
  UserController,
  ArticleController,
  EventController,
} from './controllers';
import {
  AuthService,
  UserService,
  ArticleService,
  EventService,
} from './services';
import { AuthModule, UserModule } from './modules';

import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AuthController,
    UserController,
    ArticleController,
    EventController,
  ],
  providers: [AuthService, UserService, ArticleService, EventService],
})
export class AppModule {}
