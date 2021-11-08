import { PartialType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';

export class UpdateAuthorInputDto extends PartialType(Author) {}

export type UpdateAuthorOutputDto = Author;
