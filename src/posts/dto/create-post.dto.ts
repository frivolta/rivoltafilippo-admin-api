import { Post } from '../entities/post.entity';
import { OmitType } from '@nestjs/swagger';

export class CreatePostInput extends OmitType(Post, [
  'updatedAt',
  'id',
  'createdAt',
]) {}

export class CreatePostOutput {
  post: Post;
}
