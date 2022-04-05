import { IUpdateUserPassword } from '../../domain/user/use-cases/updateUserPassword'
import { ForbiddenError, NotFoundError } from '../errors'
import { IGetUserByIdRepo } from '../interfaces'
import { IUpdateUserPasswordRepo } from '../interfaces/updateUserPassword'

export class DBUpdateUserPassword implements IUpdateUserPassword {
  constructor (
    private readonly updateUserPassword: IUpdateUserPasswordRepo,
    private readonly getUserById: IGetUserByIdRepo
  ) {}

  public async update (id: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.getUserById.getById(id)

    if (user == null) {
      throw new NotFoundError('User not found')
    }

    if (user?.password !== oldPassword) {
      throw new ForbiddenError('passwords does not match')
    }

    await this.updateUserPassword.updatePassword(id, newPassword)
  }
}
