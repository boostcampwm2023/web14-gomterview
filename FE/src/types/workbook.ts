type WorkbookEntity = {
  workbookId: number;
  categoryId: number;
  nickname: string;
  profileImg: string;
  copyCount: number;
  title: string;
  content: string;
};

/**
 * POST workbook
 * 문제집을 새로 추가할 때 요청 객체 타입
 */
export type WorkbookAddReqDto = Pick<
  WorkbookEntity,
  'title' | 'content' | 'categoryId'
>;

/**
 * POST workbook
 * 문제집을 새로 추가할 때 응답 객체 타입
 */
export type WorkbookAddResDto = Pick<WorkbookEntity, 'workbookId'>;

/**
 * GET workbook?category=${categoryId}
 * 카테고리별 문제집을 조회했을 때 응답 객체 타입
 */
export type WorkbookListResDto = Omit<WorkbookEntity, 'categoryId'>;

/**
 * GET workbook/my
 * 나의 문제집을 조회했을 때 응답 객체 타입
 */
export type WorkbookMyResDto = Pick<WorkbookEntity, 'workbookId' | 'title'>[];

/**
 * GET workbook/${workbookId}
 * 문제집 아이디로 문제집을 단건 조회 했을 때 응답 객체 타입
 */
export type WorkbookResDto = Omit<WorkbookEntity, 'categoryId'>;

/**
 * PATCH workbook/${workbookId}
 * 문제집을 수정할 때 요청 객체 타입
 */
export type WorkbookPatchReqDto = Pick<
  WorkbookEntity,
  'workbookId' | 'title' | 'content' | 'categoryId'
>;
