import { Post } from '../entities/post.entity';
import { PickType } from '@nestjs/swagger';

export class GetPostInputBySlugDto extends PickType(Post, ['slug']) {}

export class GetPostOutputBySlugDto {
  post: Post;
}
