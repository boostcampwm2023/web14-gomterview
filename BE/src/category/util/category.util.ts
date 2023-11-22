import { Category } from '../entity/category';
import { isEmpty } from 'class-validator';
import { CategoryNotFoundException } from '../exception/category.exception';

export const validateCategory = (category: Category) => {
  if (isEmpty(category)) throw new CategoryNotFoundException();
};
