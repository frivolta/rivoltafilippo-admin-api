import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MOCKED_AUTHOR_ENTITY } from 'src/fixtures/author';
import { CreatePostInput } from 'src/posts/dto/create-post.dto';
import { Repository } from 'typeorm';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateAuthorInput } from './dto/create-author.dto';
import { Author } from './entities/author.entity';
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

const mockedAuthorInput: CreateAuthorInput = {
  name: 'John',
  picture: 'https://www.picture.com',
};

const mockedAuthorEntity: Author = {
  ...MOCKED_AUTHOR_ENTITY,
  posts: [],
};

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
    repository = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Controller', () => {
    it('should create an author', async () => {
      repository.create.mockReturnValue(mockedAuthorEntity);
      const result = await controller.create(mockedAuthorInput);
      expect(result).toMatchObject({ author: mockedAuthorEntity });
    });

    it('should get an author by id', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockedAuthorEntity));
      const result = await controller.getAuthorById({ id: 1 });
      expect(result).toMatchObject({ author: mockedAuthorEntity });
    });
    it('should get an author by name', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockedAuthorEntity));
      const result = await controller.getAuthorByName({ name: 'John' });
      expect(result).toMatchObject({ author: mockedAuthorEntity });
    });
    it('should delete an author', async () => {
      repository.delete.mockReturnValue(Promise.resolve(true));
      const result = await controller.deleteAuthor({ id: '1' });
      expect(result).toMatchObject({ ok: true });
    });
    it.only('should edit an author', async () => {
      repository.update.mockReturnValue(
        Promise.resolve({ ...mockedAuthorEntity, name: 'Edited name' }),
      );
      repository.findOne
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce({ ...mockedAuthorEntity, name: 'Edited name' });
      const result = await controller.updateAuthor({
        id: 1,
        name: 'Edited name',
      });
      expect(repository.findOne).toHaveBeenCalledTimes(2);
      expect(result).toMatchObject({
        ...mockedAuthorEntity,
        name: 'Edited name',
      });
    });
  });
});
