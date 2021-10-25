import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Console } from 'console';
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
  publishedAt: new Date(),
  img: 'http://www.rivoltafilippo.com/content.jpg',
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
};

const MOCKED_ENTITY_INPUT: CreatePostInput = {
  title: 'Lorem ipsum title',
  slug: 'lorem-ipsum-title-2',
  content: 'Lorem ipsum content',
  mediumUrl: 'http://www.rivoltafilippo.com',
  redditUrl: 'http://www.rivoltafilippo.com',
  publishedAt: new Date(),
  img: 'http://www.rivoltafilippo.com/content.jpg',
  isDraft: false,
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
      const result = await service.createPost(MOCKED_ENTITY_INPUT);

      expect(postRepository.create).not.toHaveBeenCalled();
    });
  });
});
