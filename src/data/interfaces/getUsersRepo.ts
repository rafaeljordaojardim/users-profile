import { User } from '../../entities/user'

export interface IGetUsersRepo {
  get: () => Promise<User[] | undefined>
}
