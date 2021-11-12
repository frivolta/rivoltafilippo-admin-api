import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockedAuthorGenerator,
  MOCKED_AUTHOR_ENTITY,
} from 'src/fixtures/author';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { PostService } from './posts.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const MOCKED_ENTITY_VALUES: Post = {
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

const MOCKED_ENTITY_INPUT: CreatePostInput = {
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

describe('PostService', () => {
  let service: PostService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<PostService>(PostService);
    postRepository = module.get(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create post', async () => {
      const result = await service.createPost(MOCKED_ENTITY_INPUT);
      postRepository.create.mockResolvedValueOnce(MOCKED_ENTITY_VALUES);
      expect(postRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('post');
    });

    it('should fail if slug already exists', async () => {
      postRepository.findOne.mockResolvedValue(MOCKED_ENTITY_VALUES);
      try {
        await service.createPost(MOCKED_ENTITY_INPUT);
      } catch (err) {
        expect(err.getResponse().response).toEqual('Slug already exists');
        expect(err).toBeInstanceOf(HttpException);
      }
    });

    it('should fail if slug already exists', async () => {
      postRepository.save.mockRejectedValue(new Error('Async error'));
      try {
        await service.createPost(MOCKED_ENTITY_INPUT);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
      }
    });
  });
});
