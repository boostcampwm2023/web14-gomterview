import { Category } from '../entity/category';
import { CategoryResponse } from '../dto/categoryResponse';

export const beCategoryFixture = new Category(undefined, 'BE', new Date());
export const feCategoryFixture = new Category(undefined, 'FE', new Date());
export const csCategoryFixture = new Category(undefined, 'CS', new Date());
export const customCategoryFixture = new Category(
  undefined,
  '나만의 질문',
  new Date(),
);
export const categoryFixtureWithId = new Category(
  100,
  '나만의 질문',
  new Date(),
);

export const categoryListFixture = [
  new Category(1, 'BE', new Date()),
  new Category(2, 'CS', new Date()),
  new Category(3, 'FE', new Date()),
  new Category(4, '나만의 질문', new Date()),
];

export const defaultCategoryListFixture = [
  new Category(1, 'BE', new Date()),
  new Category(2, 'CS', new Date()),
  new Category(3, 'FE', new Date()),
  new Category(4, '나만의 질문', new Date()),
];

export const categoryListResponseFixture = categoryListFixture.map(
  CategoryResponse.from,
);

export const defaultCategoryListResponseFixture =
  defaultCategoryListFixture.map(CategoryResponse.from);
