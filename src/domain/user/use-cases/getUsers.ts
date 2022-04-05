import { User } from '../../../entities/user'

export interface IGetUsers {
  get: () => Promise<User[] | undefined>
}
