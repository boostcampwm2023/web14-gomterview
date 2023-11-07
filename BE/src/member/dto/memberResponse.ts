import { Member } from '../entity/member';

class MemberResponse {
  private id: number;
  private email: string;
  private nickname: string;
  private profileImg: string;
  constructor(member: Member) {
    this.id = member.id;
    this.email = member.email;
    this.nickname = member.nickname;
    this.profileImg = member.profileImg;
  }
}

export { MemberResponse };
