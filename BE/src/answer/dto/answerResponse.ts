import { Answer } from '../entity/answer';
import { Member } from '../../member/entity/member';

export class AnswerResponse {
  answerId: number;

  content: string;

  memberId: number;

  memberName: string;

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
    return new AnswerResponse(
      answer.id,
      answer.content,
      member.id,
      member.nickname,
      member.profileImg,
    );
  }
}
