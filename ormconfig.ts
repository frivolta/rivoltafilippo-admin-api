import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'nest-db',
  database: 'pgfour',
  username: 'pgtwo',
  password: 'pgtwo',
  port: 5432,
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  subscribers: ['dist/src/subscriber/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
