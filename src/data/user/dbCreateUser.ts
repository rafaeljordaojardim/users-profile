import { ICreateUser } from '../../domain/user/use-cases/createUser'
import { User } from '../../entities/user'
import { IUser } from '../../presentation/interfaces/user'
import { ICreateUserRepo } from '../interfaces/createUserRepo'
export class DBCreateUser implements ICreateUser {
  constructor (
    private readonly createUser: ICreateUserRepo
  ) {}

  public async create (user: IUser): Promise<User> {
    const userCreated = await this.createUser.create(user)
    return userCreated
  }
}
