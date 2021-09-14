import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import config from './ormconfig';

interface SeedConfig extends MysqlConnectionOptions {
  seeds: string[];
  factories: string[];
}

const seedConfig: SeedConfig = {
  ...config,
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*.seed{.ts,.js}'],
  factories: ['src/database/factories/**/*.factory{.ts,.js}'],
};

export default seedConfig;
