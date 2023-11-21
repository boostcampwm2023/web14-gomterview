import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DefaultEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  constructor(id: number, createdAt: Date) {
    super();
    this.id = id;
    this.createdAt = createdAt;
  }

  static new(): DefaultEntity {
    return new DefaultEntity(undefined, new Date());
  }

  getId() {
    return this.id;
  }
}
