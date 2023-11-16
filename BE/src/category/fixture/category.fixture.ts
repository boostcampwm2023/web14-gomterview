import { Category } from '../entity/category';
import { CategoryResponse } from '../dto/categoryResponse';
import { memberFixture } from '../../member/fixture/member.fixture';

export const beCategoryFixture = new Category(
  undefined,
  'BE',
  null,
  new Date(),
);
export const feCategoryFixture = new Category(
  undefined,
  'FE',
  null,
  new Date(),
);
export const csCategoryFixture = new Category(
  undefined,
  'CS',
  null,
  new Date(),
);
export const customCategoryFixture = new Category(
  undefined,
  '나만의 질문',
  null,
  new Date(),
);

export const categoryListFixture = [
  new Category(1, 'BE', memberFixture, new Date()),
  new Category(2, 'CS', memberFixture, new Date()),
  new Category(3, 'FE', memberFixture, new Date()),
  new Category(4, '나만의 질문', memberFixture, new Date()),
];

export const defaultCategoryListFixture = [
  new Category(1, 'BE', null, new Date()),
  new Category(2, 'CS', null, new Date()),
  new Category(3, 'FE', null, new Date()),
  new Category(4, '나만의 질문', null, new Date()),
];

export const categoryListResponseFixture = categoryListFixture.map(
  CategoryResponse.from,
);

export const defaultCategoryListResponseFixture =
  defaultCategoryListFixture.map(CategoryResponse.from);
