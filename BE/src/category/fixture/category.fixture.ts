import { Category } from '../entity/category';
import { memberFixture } from '../../member/fixture/member.fixture';

export const beCategoryFixture = new Category(
  undefined,
  'BE',
  memberFixture,
  new Date(),
);
export const feCategoryFixture = new Category(
  undefined,
  'FE',
  memberFixture,
  new Date(),
);
export const csCategoryFixture = new Category(
  undefined,
  'CS',
  memberFixture,
  new Date(),
);
export const customCategoryFixture = new Category(
  undefined,
  '나만의 질문',
  memberFixture,
  new Date(),
);
