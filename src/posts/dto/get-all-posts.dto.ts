import { Post } from '../entities/post.entity';
import { OmitType } from '@nestjs/swagger';

export class GetAllPostsDto {
  posts: Post[];
}
