import { CreatePostInput } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/entities/post.entity';
import { MOCKED_AUTHOR_ENTITY } from './author';

export const MOCKED_POST: CreatePostInput = {
  title: 'Lorem ipsum title',
  slug: 'lorem-ipsum-title-2',
  content: 'Lorem ipsum content',
  mediumUrl: 'http://www.rivoltafilippo.com',
  redditUrl: 'http://www.rivoltafilippo.com',
  publishedAt: new Date().toString(),
  img: 'http://www.rivoltafilippo.com/content.jpg',
  isDraft: false,
  author: MOCKED_AUTHOR_ENTITY,
};

export const MOCKED_POST_ENTITY: Post = {
  title: 'Lorem ipsum title',
  slug: 'lorem-ipsum-title-2',
  content: 'Lorem ipsum content',
  mediumUrl: 'http://www.rivoltafilippo.com',
  redditUrl: 'http://www.rivoltafilippo.com',
  publishedAt: new Date().toString(),
  img: 'http://www.rivoltafilippo.com/content.jpg',
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  author: MOCKED_AUTHOR_ENTITY,
};

export function mockedPostGenerator() {
  return MOCKED_POST_ENTITY;
}
