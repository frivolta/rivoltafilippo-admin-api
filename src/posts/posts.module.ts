import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
