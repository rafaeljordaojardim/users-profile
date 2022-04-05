import { User } from '../../../entities/user'
import { IUser } from '../../../presentation/interfaces/user'

export interface ICreateUser {
  create: (user: IUser) => Promise<User>
}
