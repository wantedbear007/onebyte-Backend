export interface userRegistrationModel {
  name: string;
  email: string;
  username: string;
  bio: string;
  profileUrl?: string;
  password: string;
}

export interface userLoginModel {
  username: string;
  password: string;
}
