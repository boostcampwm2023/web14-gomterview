import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../app.entity';
import { Member } from '../../member/entity/member';
import { JoinColumn } from 'typeorm/browser';
import { Question } from '../../question/entity/question';

@Entity({ name: 'Category' })
export class Category extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => Member, { nullable: true })
  @JoinColumn({ name: 'memberId' })
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
