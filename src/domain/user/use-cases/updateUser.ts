import { User } from '../../../entities/user'

export interface IUpdateUser {
  update: (id: number, body: any) => Promise<User | undefined>
}
