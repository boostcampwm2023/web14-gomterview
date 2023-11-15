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

  constructor(name: string) {
    super(undefined, new Date());
    this.name = name;
  }

  static copyCategory(category: Category) {
    return new Category(category.name);
  }

  getName() {
    return this.name;
  }
}
