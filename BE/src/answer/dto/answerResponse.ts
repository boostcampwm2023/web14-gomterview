import { Answer } from '../entity/answer';
import { Member } from '../../member/entity/member';
import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { isEmpty } from 'class-validator';

export class AnswerResponse {
  @ApiProperty(createPropertyOption(1, '답변 ID', Number))
  answerId: number;

  @ApiProperty(createPropertyOption('답변 내용입니다', '답변 내용', String))
  content: string;

  @ApiProperty(createPropertyOption(1, '회원 ID', Number))
  memberId: number;

  @ApiProperty(createPropertyOption('이장희', '회원 이름', String))
  memberName: string;

  @ApiProperty(
    createPropertyOption(
      'https://jangsarchive.tistory.com/',
      '회원 프로필 이미지 주소',
      String,
    ),
  )
  profileImg: string;

  constructor(
    answerId: number,
    content: string,
    memberId: number,
    memberName: string,
    profileImg: string,
  ) {
    this.answerId = answerId;
    this.content = content;
    this.memberId = memberId;
    this.memberName = memberName;
    this.profileImg = profileImg;
  }

  static from(answer: Answer, member: Member) {
    if (isEmpty(member)) {
      return new AnswerResponse(
        answer.id,
        answer.content.toString(),
        null,
        null,
        null,
      );
    }
    return new AnswerResponse(
      answer.id,
      answer.content.toString(),
      member.id,
      member.nickname,
      member.profileImg,
    );
  }
}
