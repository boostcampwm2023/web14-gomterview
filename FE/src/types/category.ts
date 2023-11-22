export type Category = {
  id: number;
  name: string;
};

export type CategoryResDto = {
  customCategory: Category;
  categories: Category[];
};
