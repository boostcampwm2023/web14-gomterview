import { DefaultEntity } from '../../app.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Member } from '../../member/entity/member';
import { Category } from '../../category/entity/category';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';

@Entity({ name: 'Workbook' })
@Index('idx_isPublic', ['isPublic'])
@Index('idx_isPublic_categoryId', ['isPublic', 'category'])
export class Workbook extends DefaultEntity {
  @Column()
  title: string;

  @Column({ type: 'blob', nullable: true })
  content: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category' })
  category: Category;

  @Column()
  copyCount: number;

  @ManyToOne(() => Member, { nullable: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'member' })
  member: Member;

  @Column({ default: true })
  isPublic: boolean;

  constructor(
    id: number,
    createdAt: Date,
    title: string,
    content: string,
    category: Category,
    copyCount: number,
    member: Member,
    isPublic: boolean,
  ) {
    super(id, createdAt);
    this.title = title;
    this.content = content;
    this.category = category;
    this.copyCount = copyCount;
    this.member = member;
    this.isPublic = isPublic;
  }

  static of(
    title: string,
    content: string,
    category: Category,
    member: Member,
    isPublic: boolean,
  ): Workbook {
    return new Workbook(
      null,
      new Date(),
      title,
      content,
      category,
      0,
      member,
      isPublic,
    );
  }

  isOwnedBy(member: Member) {
    return this.member.id === member.id;
  }

  increaseCopyCount() {
    this.copyCount++;
  }

  updateInfo(updateWorkbookRequest: UpdateWorkbookRequest, category: Category) {
    this.title = updateWorkbookRequest.title;
    this.content = updateWorkbookRequest.content;
    this.category = category;
    this.isPublic = updateWorkbookRequest.isPublic;
  }
}
