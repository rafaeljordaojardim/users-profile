import { IGetUsers } from '../../domain/user/use-cases/getUsers'
import { User } from '../../entities/user'
import { IGetUsersRepo } from '../interfaces/getUsersRepo'

export class DBGetUsers implements IGetUsers {
  constructor (
    private readonly getUsers: IGetUsersRepo
  ) {}

  public async get (): Promise<User[] | undefined> {
    const users = await this.getUsers.get()
    return users
  }
}
