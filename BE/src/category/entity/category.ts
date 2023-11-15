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

  constructor(name: string, member: Member) {
    super(undefined, new Date());
    this.member = member;
    this.name = name;
  }

  static from(inputObj: CreateCategoryRequest | Category, member: Member) {
    return new Category(inputObj.name, member);
  }

  getName() {
    return this.name;
  }
}
