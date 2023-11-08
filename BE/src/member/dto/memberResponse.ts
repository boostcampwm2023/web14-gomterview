import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../entity/member';
import { createPropertyOption } from 'src/util/swagger.util';

class MemberResponse {
  @ApiProperty(createPropertyOption(1, '회원의 ID', Number))
  private id: number;

  @ApiProperty(createPropertyOption('foo@example.com', '회원의 이메일', String))
  private email: string;

  @ApiProperty(createPropertyOption('foobar', '회원의 닉네임', String))
  private nickname: string;

  @ApiProperty(
    createPropertyOption('https://example.com', '프로필 이미지의 주소', String),
  )
  private profileImg: string;

  constructor(id: number, email: string, nickname: string, profileImg: string) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.profileImg = profileImg;
  }

  static from(user: Member) {
    return new MemberResponse(
      user.id,
      user.email,
      user.nickname,
      user.profileImg,
    );
  }
}

export { MemberResponse };
