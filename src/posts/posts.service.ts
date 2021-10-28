import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { GetAllPostsDto } from './dto/get-all-posts.dto';
import { GetPublicPostsDto } from './dto/get-public-posts.dto';
import { DeletePostInputDto, DeletePostOutputDto } from './dto/delete-post.dto';

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

  async getAllPosts(): Promise<GetAllPostsDto> {
    try {
      const posts = await this.posts.find();
      return { posts };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getPublicPosts(): Promise<GetPublicPostsDto> {
    try {
      const posts = await this.posts.find({ where: { isDraft: false } });
      return { posts };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePostDto(
    deletePostInput: DeletePostInputDto,
  ): Promise<DeletePostOutputDto> {
    try {
      const post = await this.posts.findOne(deletePostInput.id);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      await this.posts.delete(deletePostInput.id);
      return { ok: true };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
