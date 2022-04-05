
export interface IUpdateUserPassword {
  update: (id: number, oldPassword: string, newPassword: string) => Promise<void>
}
