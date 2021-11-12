import { Module } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

@Module({
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
})
export class PostsModule {
  /*  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  } */
}
