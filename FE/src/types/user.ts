export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImg: string;
};

export type UserNameResDto = Pick<User, 'nickname'>;
