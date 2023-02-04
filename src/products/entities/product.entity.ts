import { BaseEntityTimestamps } from 'src/common/entities/base-entity-timestamps';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntityTimestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User)
  @JoinColumn({ foreignKeyConstraintName: 'ownerId' })
  owner: User;

  @Column()
  ownerId: number;
}
