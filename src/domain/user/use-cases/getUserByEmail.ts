import { User } from '../../../entities/user'

export interface IGetUserByEmail {
  get: (email: string) => Promise<User | undefined>
}
