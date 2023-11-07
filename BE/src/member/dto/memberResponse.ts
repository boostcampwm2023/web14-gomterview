import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../entity/member';

class MemberResponse {
  @ApiProperty({
    example: '1',
    description: '회원의 ID',
    type: Number,
  })
  private id: number;

  @ApiProperty({
    example: 'example@example.com',
    description: '회원의 이메일',
    type: String,
  })
  private email: string;

  @ApiProperty({
    example: '1',
    description: '회원의 닉네임',
    type: String,
  })
  private nickname: string;

  @ApiProperty({
    example: 'https://example.com',
    description: '프로필 이미지의 주소',
    type: String,
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
