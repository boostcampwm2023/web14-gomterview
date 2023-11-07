import { Injectable } from '@nestjs/common';
import {TokenRepository} from "../repository/token.repository";
import {MemberRepository} from "../../member/repository/member.repository";

@Injectable()
export class TokenService {
    constructor(readonly tokenRepository:TokenRepository, readonly memberRepository:MemberRepository, readonly ) {
    }


}
