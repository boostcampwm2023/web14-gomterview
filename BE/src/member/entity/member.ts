import { DefaultEntity } from 'src/app.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Member' })
export class Member extends DefaultEntity {
  @Column()
  readonly email: string;

  @Column()
  readonly nickname: string;

  @Column({
    length: 1000,
  })
  readonly profileImg: string;

  constructor(
    id: number,
    email: string,
    nickname: string,
    profileImg: string,
    createdAt: Date,
  ) {
    super(id, createdAt);
    this.email = email;
    this.nickname = nickname;
    this.profileImg = profileImg;
  }
}
