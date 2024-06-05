import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const mockUser = {
  id: 'some-id',
  provider_id: 'some-provider-id',
};

const mockUserRepository = {
  create: jest.fn().mockImplementation((resource) => resource),
  save: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockResolvedValue([mockUser]),
  findOneBy: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await service.create(mockUser)).toEqual(mockUser);
  });

  it('should return an array of users', async () => {
    expect(await service.findAll()).toEqual([mockUser]);
  });

  it('should return a single user', async () => {
    expect(await service.findOne('some-id')).toEqual(mockUser);
  });

  it('should update a user', async () => {
    expect(await service.update('some-id', mockUser)).toEqual({ affected: 1 });
  });

  it('should remove a user', async () => {
    expect(await service.remove('some-id')).toEqual({ affected: 1 });
    expect(mockUserRepository.delete).toHaveBeenCalledWith("some-id");
  });
});
