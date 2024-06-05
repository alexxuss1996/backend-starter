import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserResourceService } from './user-resource.service';
import { CreateUserResourceDto } from './dto/create-user-resource.dto';
import { UpdateUserResourceDto } from './dto/update-user-resource.dto';

@Controller('user-resources')
export class UserResourceController {
  constructor(private readonly userResourceService: UserResourceService) {}

  @Post()
  create(@Body() createUserResourceDto: CreateUserResourceDto) {
    return this.userResourceService.create(createUserResourceDto);
  }

  @Get()
  findAll() {
    return this.userResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResourceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserResourceDto: UpdateUserResourceDto) {
    return this.userResourceService.update(id, updateUserResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResourceService.remove(id);
  }
}
