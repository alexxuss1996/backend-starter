import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResource } from './entities/user-resource.entity';
import { CreateUserResourceDto } from './dto/create-user-resource.dto';
import { UpdateUserResourceDto } from './dto/update-user-resource.dto';

@Injectable()
export class UserResourceService {
  constructor(
    @InjectRepository(UserResource)
    private readonly userResourceRepository: Repository<UserResource>,
  ) {}

  create(createUserResourceDto: CreateUserResourceDto) {
    const userResource = this.userResourceRepository.create(createUserResourceDto);
    return this.userResourceRepository.save(userResource);
  }

  findAll() {
    return this.userResourceRepository.find({ relations: ['user', 'resource', 'user_role'] });
  }

  findOne(id: string) {
    return this.userResourceRepository.findOneBy({ id });
  }

  update(id: string, updateUserResourceDto: UpdateUserResourceDto) {
    return this.userResourceRepository.update(id, updateUserResourceDto);
  }

  remove(id: string) {
    return this.userResourceRepository.delete(id);
  }
}
