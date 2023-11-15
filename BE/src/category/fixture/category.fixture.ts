import { Category } from '../entity/category';

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
