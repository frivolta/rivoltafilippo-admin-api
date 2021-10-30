import { Post } from '../entities/post.entity';
import { PickType } from '@nestjs/swagger';

export class GetPublicPostInputDto extends PickType(Post, ['id']) {}

export class GetPublicPostOutputDto {
  post: Post;
}
