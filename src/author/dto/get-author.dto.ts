import { PickType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class GetAuthorInputDto extends PickType(Author, ['id']) {}

export class GetAuthorOutputDto {
  author: Author;
}
