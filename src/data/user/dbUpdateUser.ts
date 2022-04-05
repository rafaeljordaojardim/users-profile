import { IUpdateUser } from '../../domain/user/use-cases/updateUser'
import { User } from '../../entities/user'
import { IUpdateUserRepo } from '../interfaces/updateUserRepo'

export class DBUpdateUser implements IUpdateUser {
  constructor (
    private readonly updateUser: IUpdateUserRepo
  ) {}

  public async update (id: number, body: any): Promise<User | undefined> {
    return await this.updateUser.update(id, body)
  }
}
