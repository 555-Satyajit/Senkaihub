export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  clan?: {
    id: string;
    name: string;
    tag: string;
    badgeUrl?: string;
  };
}

export type AuthMode = "login" | "magic-link" | "signup";

export interface LoginFormValues {
  email: string;
  password?: string;
  rememberMe?: boolean;
}
