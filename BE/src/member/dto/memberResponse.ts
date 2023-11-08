import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../entity/member';

class MemberResponse {
  @ApiProperty({
    example: '1',
    description: '회원의 ID',
  })
  private id: number;

  @ApiProperty({
    example: 'foo@example.com',
    description: '회원의 이메일',
  })
  private email: string;

  @ApiProperty({
    example: 'foobar',
    description: '회원의 닉네임',
  })
  private nickname: string;

  @ApiProperty({
    example: 'https://example.com',
    description: '프로필 이미지의 주소',
  })
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
