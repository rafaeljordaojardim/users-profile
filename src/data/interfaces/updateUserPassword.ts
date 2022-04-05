
export interface IUpdateUserPasswordRepo {
  updatePassword: (id: number, newPassword: string) => Promise<void>
}
