import { Injectable } from '@nestjs/common';
import {TokenRepository} from "../repository/token.repository";
import {MemberRepository} from "../../member/repository/member.repository";
import {JwtService} from "@nestjs/jwt";
import {Token} from "../entity/token";

const ACCESS_TOKEN_EXPIRES_IN = "1h"; // 1 시간
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // 7 일

@Injectable()
export class TokenService {
    constructor(readonly tokenRepository:TokenRepository, readonly memberRepository:MemberRepository, readonly jwtService:JwtService) {
    }

    async assignToken(memberId:number) {
        return await this.createToken(memberId);
    }

    private async createToken(memberId:number) {
        const accessToken = await this.signToken(memberId, ACCESS_TOKEN_EXPIRES_IN);
        const refreshToken = await this.signToken(memberId, REFRESH_TOKEN_EXPIRES_IN);
        const token = new Token(refreshToken, accessToken);
        await this.tokenRepository.save(token);
        return accessToken;
    }

    private async signToken(memberId:number, expiresIn: string) {
        return await this.jwtService.signAsync({id:memberId}, {
            expiresIn: expiresIn,
        });
    }
}
