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

  constructor(member: Member) {
    this.id = member.id;
    this.email = member.email;
    this.nickname = member.nickname;
    this.profileImg = member.profileImg;
  }
}

export { MemberResponse };
