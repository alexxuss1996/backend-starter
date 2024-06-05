import { Test, TestingModule } from '@nestjs/testing';
import { UserResourceController } from './user-resource.controller';
import { UserResourceService } from './user-resource.service';
import { CreateUserResourceDto } from './dto/create-user-resource.dto';
import { UpdateUserResourceDto } from './dto/update-user-resource.dto';

const mockUserResource = {
  id: 'some-id',
  user_id: 'some-user-id',
  resource_id: 'some-resource-id',
  user_role_id: 'some-user-role-id',
};

const mockUserResourceService = {
  create: jest.fn().mockResolvedValue(mockUserResource),
  findAll: jest.fn().mockResolvedValue([mockUserResource]),
  findOne: jest.fn().mockResolvedValue(mockUserResource),
  update: jest.fn().mockResolvedValue(mockUserResource),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserResourceController', () => {
  let controller: UserResourceController;
  let service: UserResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResourceController],
      providers: [
        {
          provide: UserResourceService,
          useValue: mockUserResourceService,
        },
      ],
    }).compile();

    controller = module.get<UserResourceController>(UserResourceController);
    service = module.get<UserResourceService>(UserResourceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user resource', async () => {
    const createUserResourceDto: CreateUserResourceDto = {
      user_id: 'some-user-id',
      resource_id: 'some-resource-id',
      user_role_id: 'some-user-role-id',
    };
    expect(await controller.create(createUserResourceDto)).toEqual(mockUserResource);
  });

  it('should return an array of user resources', async () => {
    expect(await controller.findAll()).toEqual([mockUserResource]);
  });

  it('should return a single user resource', async () => {
    expect(await controller.findOne('some-id')).toEqual(mockUserResource);
  });

  it('should update a user resource', async () => {
    const updateUserResourceDto: UpdateUserResourceDto = {
      user_id: 'updated-user-id',
      resource_id: 'updated-resource-id',
      user_role_id: 'updated-user-role-id',
    };
    expect(await controller.update('some-id', updateUserResourceDto)).toEqual(mockUserResource);
  });

  it('should remove a user resource', async () => {
    expect(await controller.remove('some-id')).toEqual({ affected: 1 });
  });
});
