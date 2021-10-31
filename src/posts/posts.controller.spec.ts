import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePostInput } from './dto/create-post.dto';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const MOCKED_POST: CreatePostInput = {
  title: 'Lorem ipsum title',
  slug: 'lorem-ipsum-title-2',
  content: 'Lorem ipsum content',
  mediumUrl: 'http://www.rivoltafilippo.com',
  redditUrl: 'http://www.rivoltafilippo.com',
  publishedAt: new Date(),
  img: 'http://www.rivoltafilippo.com/content.jpg',
  isDraft: false,
};

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
const EDITED_ENTITY_VALUES: Post = {
  ...MOCKED_ENTITY_VALUES,
  title: 'new title',
};

describe('PostController', () => {
  let postController: PostsController;
  let postService: PostService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    postService = moduleRef.get<PostService>(PostService);
    postController = moduleRef.get<PostsController>(PostsController);
    postRepository = moduleRef.get(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
    expect(postController).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  describe('Controller', () => {
    it('should create a post', async function () {
      const result = await postController.create(MOCKED_POST);
      postRepository.create.mockResolvedValueOnce(MOCKED_ENTITY_VALUES);
      expect(postRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('post');
    });

    it('should get all posts', async () => {
      const result = await postController.getAllPosts();
      postRepository.find.mockResolvedValueOnce([
        MOCKED_ENTITY_VALUES,
        MOCKED_ENTITY_VALUES,
      ]);
      expect(result).toHaveProperty('posts');
      expect(postRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should get a post', async () => {
      jest
        .spyOn(postRepository, 'findOne')
        .mockReturnValue(Promise.resolve(MOCKED_ENTITY_VALUES));
      const result = await postController.getPost({ id: 1 });
      expect(result).toHaveProperty('post');
      expect(postRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('edit a post', async () => {
      jest
        .spyOn(postRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(MOCKED_ENTITY_VALUES));
      jest
        .spyOn(postRepository, 'update')
        .mockReturnValue(Promise.resolve(EDITED_ENTITY_VALUES));
      await postController.updatePost('1', {
        title: EDITED_ENTITY_VALUES.title,
      });
      expect(postRepository.update).toHaveBeenCalledTimes(1);
    });
    it('should delete a post', async () => {
      jest
        .spyOn(postRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(MOCKED_ENTITY_VALUES));
      jest
        .spyOn(postRepository, 'delete')
        .mockReturnValue(Promise.resolve({ ok: true }));
      const result = await postController.deletePost({ id: '1' });
      expect(result).toEqual({ ok: true });
    });
    it('should get a public post', async () => {
      jest
        .spyOn(postRepository, 'findOne')
        .mockReturnValue(Promise.resolve(MOCKED_ENTITY_VALUES));
      const result = await postController.getPost({ id: 1 });
      expect(result).toHaveProperty('post');
      expect(postRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should get all public posts', async () => {
      const result = await postController.getAllPosts();
      postRepository.find.mockResolvedValueOnce([
        MOCKED_ENTITY_VALUES,
        MOCKED_ENTITY_VALUES,
      ]);
      expect(result).toHaveProperty('posts');
      expect(postRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
