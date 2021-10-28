import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as fs from 'fs';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  synchronize: false,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: {
      ca: fs.readFileSync('./src/cert.crt').toString(),
    },
  }),
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  subscribers: ['dist/src/subscriber/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
