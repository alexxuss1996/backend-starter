import { Test, TestingModule } from '@nestjs/testing';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

const mockResource = {
  id: 'some-id',
  type: 'some-type',
};

const mockResourceService = {
  create: jest.fn().mockResolvedValue(mockResource),
  findAll: jest.fn().mockResolvedValue([mockResource]),
  findOne: jest.fn().mockResolvedValue(mockResource),
  update: jest.fn().mockResolvedValue(mockResource),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('ResourceController', () => {
  let controller: ResourceController;
  let service: ResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: mockResourceService,
        },
      ],
    }).compile();

    controller = module.get<ResourceController>(ResourceController);
    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a resource', async () => {
    const createResourceDto: CreateResourceDto = { type: 'some-type' };
    expect(await controller.create(createResourceDto)).toEqual(mockResource);
  });

  it('should return an array of resources', async () => {
    expect(await controller.findAll()).toEqual([mockResource]);
  });

  it('should return a single resource', async () => {
    expect(await controller.findOne('some-id')).toEqual(mockResource);
  });

  it('should update a resource', async () => {
    const updateResourceDto: UpdateResourceDto = { type: 'updated-type' };
    expect(await controller.update('some-id', updateResourceDto)).toEqual(mockResource);
  });

  it('should remove a resource', async () => {
    expect(await controller.remove('some-id')).toEqual({ affected: 1 });
  });
});
