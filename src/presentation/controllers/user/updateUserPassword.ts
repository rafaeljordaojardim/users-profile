import { noContent } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { Request, Response } from 'express'
import { IResponse } from '../../interfaces/response'
import { IUpdateUserPassword } from '../../../domain/user/use-cases/updateUserPassword'
import { errorProcessor } from '../../../utils/common'

export class UpdateUserPasswordController implements IController {
  constructor (
    private readonly updateUserPassword: IUpdateUserPassword
  ) {}

  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const id = Number(req.params.id)
      const { oldPassword, newPassword } = req.body
      await this.updateUserPassword.update(id, oldPassword, newPassword)
      return noContent()
    } catch (error) {
      console.error(`Error updating user password: ${String(error)}`)
      return errorProcessor(error)
    }
  }
}
