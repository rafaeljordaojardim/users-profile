import { User } from '../../entities/user'

export interface IGetUserByIdRepo {
  getById: (id: number) => Promise<User | undefined>
}
