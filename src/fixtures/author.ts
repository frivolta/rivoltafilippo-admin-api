import { Author } from 'src/author/entities/author.entity';
import { mockedPostGenerator, MOCKED_POST_ENTITY } from './post';

export const MOCKED_AUTHOR_ENTITY: Author = {
  id: 1,
  name: 'Filippo Rivolta',
  picture: 'https://www.urlpicture.com',
  posts: [MOCKED_POST_ENTITY],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function mockedAuthorGenerator() {
  return MOCKED_AUTHOR_ENTITY;
}
