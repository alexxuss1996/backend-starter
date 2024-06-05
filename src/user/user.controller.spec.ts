import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassportModule } from '@nestjs/passport';

const mockUser = {
  id: 'some-id',
  provider_id: 'some-provider-id',
};

const mockUserService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'AzureAD' })],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { provider_id: 'some-provider-id' };
    expect(await controller.create(createUserDto)).toEqual(mockUser);
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll()).toEqual([mockUser]);
  });

  it('should return a single user', async () => {
    expect(await controller.findOne('some-id')).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { provider_id: 'updated-provider-id' };
    expect(await controller.update('some-id', updateUserDto)).toEqual(mockUser);
  });

  it('should remove a user', async () => {
    expect(await controller.remove('some-id')).toEqual({ affected: 1 });
  });
});
