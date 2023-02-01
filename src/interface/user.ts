import { Interface } from "readline";

export interface IUserData {
  email: string;
  phone: string;
  identities: Array<{
    provider: string;
  }>;
  id: string;
  user_metadata: {
    preferred_username: string;
    avatar_url: string;
    email_verified: boolean;
    user_name: string;
  };
}

export interface IUserUpdateableData {
  name: string;
  old_password: string;
  new_password: string;
  info_profile: string;
}

export interface IUserGetData {
  name: string;
  email: string;
  link_portfolio: string;
  info_profile: string;
  avatar: string;
}
