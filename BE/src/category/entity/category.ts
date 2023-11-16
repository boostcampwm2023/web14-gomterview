import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../app.entity';
import { Member } from '../../member/entity/member';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';

@Entity({ name: 'Category' })
export class Category extends DefaultEntity {
  @Column()
  name: string;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  constructor(id: number, name: string, member: Member, createdAt: Date) {
    super(id, createdAt);
    this.member = member;
    this.name = name;
  }

  static from(inputObj: CreateCategoryRequest | Category, member: Member) {
    return new Category(null, inputObj.name, member, new Date());
  }

  isOwnedBy(member: Member) {
    return this.member.equals(member);
  }

  getName() {
    return this.name;
  }
}
