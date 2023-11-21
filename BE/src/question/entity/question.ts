import { DefaultEntity } from '../../app.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entity/category';
import { Answer } from '../../answer/entity/answer';

@Entity({ name: 'Question' })
export class Question extends DefaultEntity {
  @Column({ type: 'text' })
  readonly content: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'category' })
  readonly category: Category;

  @ManyToOne(() => Question, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'origin' })
  readonly origin: Question;

  @ManyToOne(() => Answer, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'defaultQuestion' })
  defaultAnswer: Answer;

  constructor(
    id: number,
    content: string,
    category: Category,
    origin: Question,
    createdAt: Date,
    defaultAnswer: Answer,
  ) {
    super(id, createdAt);
    this.content = content;
    this.category = category;
    this.origin = origin;
    this.defaultAnswer = defaultAnswer;
  }

  static of(category: Category, origin: Question, content: string) {
    return new Question(null, content, category, origin, new Date(), null);
  }

  static copyOf(question: Question, category: Category) {
    return new Question(
      null,
      question.content,
      category,
      question,
      new Date(),
      question.defaultAnswer,
    );
  }

  setDefaultAnswer(answer: Answer) {
    this.defaultAnswer = answer;
  }
}
