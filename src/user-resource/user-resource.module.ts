import { Module } from '@nestjs/common';
import { UserResourceService } from './user-resource.service';
import { UserResourceController } from './user-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResource } from './entities/user-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserResource])],
  controllers: [UserResourceController],
  providers: [UserResourceService],
})
export class UserResourceModule {}
