import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  create(createResourceDto: CreateResourceDto) {
    const resource = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(resource);
  }

  findAll() {
    return this.resourceRepository.find();
  }

  findOne(id: string) {
    return this.resourceRepository.findOneBy({ id });
  }

  update(id: string, updateResourceDto: UpdateResourceDto) {
    return this.resourceRepository.update(id, updateResourceDto);
  }

  remove(id: string) {
    return this.resourceRepository.delete(id);
  }
}
