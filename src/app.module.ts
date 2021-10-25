import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    PostsModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
