import { DefaultEntity } from '../../app.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Member } from '../../member/entity/member';
import { Category } from '../../category/entity/category';

@Entity({ name: 'Workbook' })
export class Workbook extends DefaultEntity {
  @Column()
  title: string;

  @Column({ type: 'blob' })
  content: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category' })
  category: Category;

  @Column()
  copyCount: number;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'member' })
  member: Member;

  constructor(
    id: number,
    createdAt: Date,
    title: string,
    content: string,
    category: Category,
    copyCount: number,
    member: Member,
  ) {
    super(id, createdAt);
    this.title = title;
    this.content = content;
    this.category = category;
    this.copyCount = copyCount;
    this.member = member;
  }

  static of(
    title: string,
    content: string,
    category: Category,
    member: Member,
  ): Workbook {
    return new Workbook(null, new Date(), title, content, category, 0, member);
  }

  isOwnedBy(member: Member) {
    return this.member.id === member.id;
  }
}
