import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';

const mockResource = {
  id: 'some-id',
  type: 'some-type',
};

const mockResourceRepository = {
  create: jest.fn().mockImplementation((resource) => resource),
  save: jest.fn().mockResolvedValue(mockResource),
  find: jest.fn().mockResolvedValue([mockResource]),
  findOneBy: jest.fn().mockResolvedValue(mockResource),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('ResourceService', () => {
  let service: ResourceService;
  let repository: Repository<Resource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockResourceRepository,
        },
      ],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
    repository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a resource', async () => {
    expect(await service.create(mockResource)).toEqual(mockResource);
  });

  it('should return an array of resources', async () => {
    expect(await service.findAll()).toEqual([mockResource]);
  });

  it('should return a single resource', async () => {
    expect(await service.findOne('some-id')).toEqual(mockResource);
  });

  it('should update a resource', async () => {
    expect(await service.update('some-id', mockResource)).toEqual({ affected: 1 });
  });

  it('should remove a resource', async () => {
    expect(await service.remove('some-id')).toEqual({ affected: 1 });
    expect(mockResourceRepository.delete).toHaveBeenCalledWith("some-id");
  });
});
