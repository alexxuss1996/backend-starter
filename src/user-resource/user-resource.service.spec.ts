import { Test, TestingModule } from '@nestjs/testing';
import { UserResourceService } from './user-resource.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserResource } from './entities/user-resource.entity';
import { Repository } from 'typeorm';

const mockUserResource = {
  id: 'some-id',
  user_id: 'some-user-id',
  resource_id: 'some-resource-id',
  user_role_id: 'some-user-role-id',
};

const mockUserResourceRepository = {
  create: jest.fn().mockImplementation((resource) => resource),
  save: jest.fn().mockResolvedValue(mockUserResource),
  find: jest.fn().mockResolvedValue([mockUserResource]),
  findOneBy: jest.fn().mockResolvedValue(mockUserResource),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserResourceService', () => {
  let service: UserResourceService;
  let repository: Repository<UserResource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResourceService,
        {
          provide: getRepositoryToken(UserResource),
          useValue: mockUserResourceRepository,
        },
      ],
    }).compile();

    service = module.get<UserResourceService>(UserResourceService);
    repository = module.get<Repository<UserResource>>(getRepositoryToken(UserResource));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user resource', async () => {
    expect(await service.create(mockUserResource)).toEqual(mockUserResource);
  });

  it('should return an array of user resources', async () => {
    expect(await service.findAll()).toEqual([mockUserResource]);
  });

  it('should return a single user resource', async () => {
    expect(await service.findOne('some-id')).toEqual(mockUserResource);
  });

  it('should update a user resource', async () => {
    expect(await service.update('some-id', mockUserResource)).toEqual({ affected: 1 });
  });

  it('should remove a user resource', async () => {
    expect(await service.remove('some-id')).toEqual({ affected: 1 });
    expect(mockUserResourceRepository.delete).toHaveBeenCalledWith("some-id");
  });
});
