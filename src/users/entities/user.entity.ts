import { BaseEntityTimestamps } from 'src/common/entities/base-entity-timestamps';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class User extends BaseEntityTimestamps {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('character varying', { unique: true })
  email!: string;

  @Column('character varying', { select: false })
  password!: string;
}
