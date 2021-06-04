import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController, UserController } from './controllers';
import { AuthService, UserService } from './services';
import { AuthModule, UserModule } from './modules';

import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule {}
