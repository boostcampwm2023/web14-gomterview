import { DefaultEntity } from '../../app.entity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Member } from '../../member/entity/member';
import {CreateQuestionRequest} from "../dto/createQuestionRequest";

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

  static from(createQuestionRequest:CreateQuestionRequest, member:Member) : Question {
    return new Question(createQuestionRequest.category, createQuestionRequest.content, [member]);
  }
}
