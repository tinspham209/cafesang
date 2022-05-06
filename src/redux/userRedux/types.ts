export type UserSocial = {
  icon: string;
  order: number;
  title: string;
  url: string;
};

export type UserTheme = {
  backgroundColor: string;
  backgroundImageUrl: string;
  color: string;
  iconColor: string;
};

export type UserMoreInfo = {
  bio: string;
  company: string;
};

export type UserInfo = {
  name: string;
  social1: UserSocial[];
  theme: UserTheme;
  userMoreInfo: UserMoreInfo;
  userUrl: string;
  userAvatar: string;
};

export type GetUserInfoPayload = {
  uid: string;
};
