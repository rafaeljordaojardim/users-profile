export interface ISigninRes {
  email: string;
  name: string;
  profileId: number;
  actions: { name: string; number: number }[];
}
export interface ISignIn {
  login: (email: string, password: string) => Promise<ISigninRes>
}
