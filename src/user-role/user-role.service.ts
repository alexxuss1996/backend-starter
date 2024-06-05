import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(id: string) {
    return this.userRoleRepository.findOneBy({ id: id });
  }

  update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleRepository.update(id, updateUserRoleDto);
  }

  remove(id: string) {
    return this.userRoleRepository.delete(id);
  }
}
