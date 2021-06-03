import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
