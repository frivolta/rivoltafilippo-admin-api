import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as fs from 'fs';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db-postgres-admin-api-production-do-user-9829637-0.b.db.ondigitalocean.com',
  database: 'defaultdb',
  username: 'doadmin',
  password: '6IhP23XI59cq6pOW',
  port: 25060,
  synchronize: false,
  ssl: {
    ca: fs.readFileSync('./src/cert.crt').toString(),
  },
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  subscribers: ['dist/src/subscriber/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
