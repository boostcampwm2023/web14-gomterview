export type VideoEntity = {
  id: number;
  memberId: number;
  questionId: number;
  videoName: string;
  thumbnail: string | null;
  videoLength: string;
  url: string;
  hash: string | null;
  isPublic: boolean;
  createdAt: string;
};

/**
 * GET video/all
 * 비디오 전체 리스트를 조회했을 때 응답 객체 타입
 */
export type VideoListResDto = Pick<
  VideoEntity,
  'id' | 'thumbnail' | 'videoName' | 'videoLength' | 'isPublic' | 'createdAt'
>[];

/**
 * GET video/${videoId}
 * 비디오 아이디로 비디오를 단건 조회했을 때 응답 객체 타입
 */
export type VideoItemResDto = Pick<
  VideoEntity,
  'id' | 'url' | 'hash' | 'videoName' | 'createdAt'
>;

/**
 * POST video
 * 비디오를 등록할 때 요청 객체 타입
 */
export type VideoAddReqDto = Pick<
  VideoEntity,
  'questionId' | 'videoName' | 'url' | 'thumbnail' | 'videoLength'
>;

/**
 * POST video/pre-signed
 * 비디오 등록 전 질문 아이디로 비디오 등록용 pre-signed url을 요청하는 객체 타입
 * @deprecated
 */
export type VideoPreSignedReqDto = Pick<VideoEntity, 'questionId'>;

/**
 * POST video/pre-signed
 * 비디오 등록 전 질문 아이디로 비디오 등록용 pre-signed url 응답 객체 타입
 */
export type VideoPreSignedResDto = {
  preSignedUrl: string;
  key: string; //비디오 파일 이름입니다.
};

/**
 * PATCH video/${videoId}
 * 비디오 공개, 비공개 토글시 응답 객체 타입
 */
export type VideoPublicToggleResDto = Pick<VideoEntity, 'hash'>;
