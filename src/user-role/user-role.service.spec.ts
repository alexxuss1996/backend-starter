import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';

const mockUserRole = {
  id: 'some-id',
  role_name: 'some-role-name',
};

const mockUserRoleRepository = {
  create: jest.fn().mockImplementation((resource) => resource),
  save: jest.fn().mockResolvedValue(mockUserRole),
  find: jest.fn().mockResolvedValue([mockUserRole]),
  findOneBy: jest.fn().mockResolvedValue(mockUserRole),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserRoleService', () => {
  let service: UserRoleService;
  let repository: Repository<UserRole>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockUserRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
    repository = module.get<Repository<UserRole>>(getRepositoryToken(UserRole));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user role', async () => {
    expect(await service.create(mockUserRole)).toEqual(mockUserRole);
  });

  it('should return an array of user roles', async () => {
    expect(await service.findAll()).toEqual([mockUserRole]);
  });

  it('should return a single user role', async () => {
    expect(await service.findOne('some-id')).toEqual(mockUserRole);
  });

  it('should update a user role', async () => {
    expect(await service.update('some-id', mockUserRole)).toEqual({ affected: 1 });
  });

  it('should remove a user role', async () => {
    expect(await service.remove('some-id')).toEqual({ affected: 1 });
    expect(mockUserRoleRepository.delete).toHaveBeenCalledWith("some-id");
  });
});
