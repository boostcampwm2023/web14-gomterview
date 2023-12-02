export type MemberEntity = {
  id: number;
  email: string;
  nickname: string;
  profileImg: string;
};

/**
 * GET member/
 * 토큰을 바탕으로 유저 정보를 조회했을 때 응답 타입입니다.
 */
export type MemberItemResDto = MemberEntity;

/**
 * GET member/name
 */
export type MemberNameResDto = Pick<MemberEntity, 'nickname'>;
