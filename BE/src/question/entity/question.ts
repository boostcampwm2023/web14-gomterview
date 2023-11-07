import { DefaultEntity } from '../../app.entity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Member } from '../../member/entity/member';

@Entity({ name: 'Question' })
export class Question extends DefaultEntity {
  @Column()
  readonly category: string;

  @Column({ type: 'text' })
  readonly content: string;

  @ManyToMany(() => Member)
  @JoinTable({ name: 'MemberQuestion' })
  readonly members: Member[];

  constructor(category: string, content: string, members: Member[]) {
    super(undefined, new Date());
    this.category = category;
    this.content = content;
    this.members = members;
  }
}
