import { IGetUserByEmail } from '../../domain/user/use-cases/getUserByEmail'
import { User } from '../../entities/user'
import { IGetUserByEmailRepo } from '../interfaces/getUserByEmailRepo'

export class DBGetUserByEmail implements IGetUserByEmail {
  constructor (
    private readonly getUserByEmail: IGetUserByEmailRepo
  ) {}

  public async get (email: string): Promise<User | undefined> {
    const user = await this.getUserByEmail.getByEmail(email, false)
    return user
  }
}
