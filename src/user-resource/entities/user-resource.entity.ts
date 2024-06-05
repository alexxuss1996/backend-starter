import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Resource } from '../../resource/entities/resource.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';

@Entity()
export class UserResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  resource_id: string;

  @Column()
  user_role_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ManyToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  user_role: UserRole;
}
