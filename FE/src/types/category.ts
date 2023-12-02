export type CategoryEntity = {
  id: number;
  name: string;
};

/**
 * GET category
 * 문제집의 카테고리를 조회했을 때 응답 객체 타입니다.
 */
export type CategoryListResDto = CategoryEntity[];
