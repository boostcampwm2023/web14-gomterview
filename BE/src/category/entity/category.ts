import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../app.entity';

@Entity({ name: 'Category' })
export class Category extends DefaultEntity {
  @Column()
  name: string;

  constructor(id: number, name: string, createdAt: Date) {
    super(id, createdAt);
    this.name = name;
  }

  static of(name: string) {
    return new Category(null, name, new Date());
  }
}
