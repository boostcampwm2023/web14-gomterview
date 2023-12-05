import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from 'src/util/swagger.util';

export class MemberNicknameResponse {
  @ApiProperty(createPropertyOption('foobar', '회원의 닉네임', String))
  nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }
}
