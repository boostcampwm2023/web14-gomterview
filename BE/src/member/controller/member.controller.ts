import { Controller } from '@nestjs/common';
import { MemberService } from '../service/member.service';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  async getMyInfo() {
    this.memberService.getMyInfo(null); // accessToken에서 해당 유저의 ID를 추출하여 서비스 단으로 넘기기
  }
}
