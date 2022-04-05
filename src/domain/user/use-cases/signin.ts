
export interface ISignIn {
  login: (email: string, password: string) => Promise<string>
}
