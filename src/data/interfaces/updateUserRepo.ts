import { User } from '../../entities/user'

export interface IUpdateUserRepo {
  update: (id: number, body: any) => Promise<User | undefined>
}
