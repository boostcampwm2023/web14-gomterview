import { DefaultEntity } from 'src/app.entity';
import { Column } from 'typeorm';

export class Member extends DefaultEntity {
  @Column()
  readonly email: string;

  @Column()
  readonly nickname: string;

  @Column()
  readonly profileImg: string;
}
