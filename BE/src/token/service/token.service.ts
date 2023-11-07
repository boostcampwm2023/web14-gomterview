import { Injectable } from '@nestjs/common';
import {TokenRepository} from "../repository/token.repository";
import {MemberRepository} from "../../member/repository/member.repository";
import {JwtService} from "@nestjs/jwt";
import {Token} from "../entity/token";
import {TokenPayload} from "../interface/token.interface";

const ACCESS_TOKEN_EXPIRES_IN = "1h"; // 1 시간
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // 7 일

@Injectable()
export class TokenService {
    constructor(readonly tokenRepository:TokenRepository, readonly memberRepository:MemberRepository, readonly jwtService:JwtService) {
    }

    async assignToken(memberId:number) {
        return await this.createToken(memberId);
    }

    async removeToken(accessToken:string) {
        const memberId = (await this.getPayload(accessToken)).id;
        const token = await this.tokenRepository.findByAccessToken(accessToken);

        if(!token) {
            throw new Error("토큰 주작");
        }

        if(!memberId || !(await this.memberRepository.findById((memberId)))) {
            throw new Error("토큰 뚫림 ㅅㄱ");
        }

        await this.tokenRepository.remove(token);
    }

    async getPayload(singleToken:string) {
        try {
            return await this.jwtService.verify(singleToken) as TokenPayload;
        }catch(error) {
            await this.parseJwtError(error.message);
        }
    }

    private async parseJwtError(message:string) {
        switch (message) {
            // 토큰에 대한 오류를 판단합니다.
            case 'INVALID_TOKEN':
            case 'TOKEN_IS_ARRAY':
            case 'NO_USER':
                throw new Error('401 유효하지 않은 토큰입니다.');

            case 'EXPIRED_TOKEN':
                throw new Error('410 토큰이 만료되었습니다.');

            default:
                throw new Error('500 서버 오류입니다.');
        }
    }

    private async createToken(memberId:number) {
        const accessToken = await this.signToken(memberId, ACCESS_TOKEN_EXPIRES_IN);
        const refreshToken = await this.signToken(memberId, REFRESH_TOKEN_EXPIRES_IN);
        const token = new Token(refreshToken, accessToken);
        await this.tokenRepository.save(token);
        return accessToken;
    }

    private async signToken(memberId:number, expiresIn: string) {
        return await this.jwtService.signAsync({id:memberId} as TokenPayload, {
            expiresIn: expiresIn,
        });
    }
}
