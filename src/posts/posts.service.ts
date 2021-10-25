import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}

  async createPost(
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const { slug } = createPostInput;
      const postBySlug = await this.posts.findOne({ slug });
      if (postBySlug) {
        throw new HttpException(
          'Slug already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const newPost = this.posts.create(createPostInput);
      await this.posts.save(newPost);
      return { post: newPost };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
