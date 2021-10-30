import { Post } from '../entities/post.entity';
import { PickType } from '@nestjs/swagger';

export class GetPostInputDto extends PickType(Post, ['id']) {}

export class GetPostOutputDto {
  post: Post;
}
