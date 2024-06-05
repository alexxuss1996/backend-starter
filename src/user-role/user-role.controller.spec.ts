import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

const mockUserRole = {
  id: 'some-id',
  role_name: 'some-role-name',
};

const mockUserRoleService = {
  create: jest.fn().mockResolvedValue(mockUserRole),
  findAll: jest.fn().mockResolvedValue([mockUserRole]),
  findOne: jest.fn().mockResolvedValue(mockUserRole),
  update: jest.fn().mockResolvedValue(mockUserRole),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserRoleController', () => {
  let controller: UserRoleController;
  let service: UserRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [
        {
          provide: UserRoleService,
          useValue: mockUserRoleService,
        },
      ],
    }).compile();

    controller = module.get<UserRoleController>(UserRoleController);
    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user role', async () => {
    const createUserRoleDto: CreateUserRoleDto = { role_name: 'some-role-name' };
    expect(await controller.create(createUserRoleDto)).toEqual(mockUserRole);
  });

  it('should return an array of user roles', async () => {
    expect(await controller.findAll()).toEqual([mockUserRole]);
  });

  it('should return a single user role', async () => {
    expect(await controller.findOne('some-id')).toEqual(mockUserRole);
  });

  it('should update a user role', async () => {
    const updateUserRoleDto: UpdateUserRoleDto = { role_name: 'updated-role-name' };
    expect(await controller.update('some-id', updateUserRoleDto)).toEqual(mockUserRole);
  });

  it('should remove a user role', async () => {
    expect(await controller.remove('some-id')).toEqual({ affected: 1 });
  });
});
