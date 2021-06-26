import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthController,
  UserController,
  ArticleController,
} from './controllers';
import { AuthService, UserService, ArticleService } from './services';
import { AuthModule, UserModule } from './modules';

import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
  ],
  controllers: [AuthController, UserController, ArticleController],
  providers: [AuthService, UserService, ArticleService],
})
export class AppModule {}
