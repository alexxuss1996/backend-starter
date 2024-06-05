import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
