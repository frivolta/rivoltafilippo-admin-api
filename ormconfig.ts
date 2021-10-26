import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'postgres.ckztgkjihhx9.eu-west-2.rds.amazonaws.com',
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
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
