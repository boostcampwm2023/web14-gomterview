import { DefaultEntity } from '../../app.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Member } from '../../member/entity/member';

@Entity()
export class Workbook extends DefaultEntity {
  @Column()
  name: string;

  @Column({ type: 'blob' })
  content: string;

  @Column()
  category: string;

  @Column()
  copyCount: number;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'member' })
  member: Member;

  constructor(
    id: number,
    createdAt: Date,
    name: string,
    content: string,
    category: string,
    copyCount: number,
    member: Member,
  ) {
    super(id, createdAt);
    this.name = name;
    this.content = content;
    this.category = category;
    this.copyCount = copyCount;
    this.member = member;
  }

  static of(
    name: string,
    content: string,
    category: string,
    member: Member,
  ): Workbook {
    return new Workbook(null, new Date(), name, content, category, 0, member);
  }
}
