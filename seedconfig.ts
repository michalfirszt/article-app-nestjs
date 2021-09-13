import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import config from './ormconfig';

interface SeedConfig extends MysqlConnectionOptions {
  seeds: string[];
  factories: string[];
}

const seedConfig: SeedConfig = {
  ...config,
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export default seedConfig;
