import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserResourceDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  resource_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_role_id: string;
}
