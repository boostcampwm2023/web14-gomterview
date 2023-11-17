export const objectEquals = (obj1: object, obj2: object) =>
  Object.entries(obj1).toString() === Object.entries(obj2).toString();
