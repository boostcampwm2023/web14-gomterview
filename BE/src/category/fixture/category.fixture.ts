import { Category } from '../entity/category';

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
