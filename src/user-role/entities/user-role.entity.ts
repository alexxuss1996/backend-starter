import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_name: string;
}
