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
