import { PartialType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class UpdatePostInputDto extends PartialType(Post) {}

export class UpdatePostOutputDto {
  post: Post;
}
