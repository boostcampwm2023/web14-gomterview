import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { DefaultEntity } from '../../app.entity';
import { Member } from '../../member/entity/member';
import { Question } from '../../question/entity/question';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';

@Entity({ name: 'Category' })
export class Category extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member' })
  member: Member;

  @ManyToMany(() => Question)
  @JoinTable({ name: 'CategoryQuestion' })
  questions: Question[];

  constructor(id: number, name: string, member: Member, createdAt: Date) {
    super(id, createdAt);
    this.member = member;
    this.name = name;
  }

  static from(inputObj: CreateCategoryRequest | Category, member: Member) {
    return new Category(undefined, inputObj.name, member, new Date());
  }

  getName() {
    return this.name;
  }
}
