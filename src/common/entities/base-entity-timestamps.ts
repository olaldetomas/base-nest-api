import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntityTimestamps extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt!: Date;
}
