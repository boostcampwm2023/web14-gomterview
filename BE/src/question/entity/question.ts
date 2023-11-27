import { DefaultEntity } from '../../app.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Answer } from '../../answer/entity/answer';
import { Workbook } from '../../workbook/entity/workbook';

@Entity({ name: 'Question' })
export class Question extends DefaultEntity {
  @Column({ type: 'text' })
  readonly content: string;

  @ManyToOne(() => Workbook, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'workbook' })
  readonly workbook: Workbook;

  @ManyToOne(() => Question, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'origin' })
  readonly origin: Question;

  @ManyToOne(() => Answer, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'defaultAnswer' })
  defaultAnswer: Answer;

  constructor(
    id: number,
    content: string,
    workbook: Workbook,
    origin: Question,
    createdAt: Date,
    defaultAnswer: Answer,
  ) {
    super(id, createdAt);
    this.content = content;
    this.workbook = workbook;
    this.origin = origin;
    this.defaultAnswer = defaultAnswer;
  }

  static of(workbook: Workbook, origin: Question, content: string) {
    return new Question(null, content, workbook, origin, new Date(), null);
  }

  static copyOf(question: Question, workbook: Workbook) {
    return new Question(
      null,
      question.content,
      workbook,
      question,
      new Date(),
      question.defaultAnswer,
    );
  }

  setDefaultAnswer(answer: Answer) {
    this.defaultAnswer = answer;
  }
}
