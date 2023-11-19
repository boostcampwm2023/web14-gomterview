import { DefaultEntity } from '../../app.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entity/category';

@Entity({ name: 'Question' })
export class Question extends DefaultEntity {
  @Column({ type: 'text' })
  readonly content: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category' })
  readonly category: Category;

  @ManyToOne(() => Question, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'origin' })
  readonly origin: Question;

  constructor(
    id: number,
    content: string,
    category: Category,
    origin: Question,
    createdAt: Date,
  ) {
    super(id, createdAt);
    this.content = content;
    this.category = category;
    this.origin = origin;
  }

  static of(category: Category, origin: Question, content: string) {
    return new Question(null, content, category, origin, new Date());
  }

  static copyOf(question: Question, category: Category) {
    return new Question(null, question.content, category, question, new Date());
  }
}
