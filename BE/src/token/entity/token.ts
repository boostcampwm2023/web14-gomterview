import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn()
  readonly refreshToken: string;

  @Column()
  accessToken: string;

  constructor(refreshToken: string, accessToken: string) {
    super();
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }

  updateAccessToken(newToken: string) {
    this.accessToken = newToken;
  }
}
