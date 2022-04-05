import { User } from '../../entities/user'
import { IUser } from '../../presentation/interfaces/user'

export interface ICreateUserRepo {
  create: (user: IUser) => Promise<User>
}
