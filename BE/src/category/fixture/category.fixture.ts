import { Category } from '../entity/category';
import { memberFixture } from '../../member/fixture/member.fixture';

export const beCategoryFixture = new Category('BE', memberFixture);
export const feCategoryFixture = new Category('FE', memberFixture);
export const csCategoryFixture = new Category('CS', memberFixture);
export const customCategoryFixture = new Category('나만의 질문', memberFixture);
