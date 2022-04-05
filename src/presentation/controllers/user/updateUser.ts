import { conflict, ok, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { Request, Response } from 'express'
import { IResponse } from '../../interfaces/response'
import { IUpdateUser } from '../../../domain/user/use-cases/updateUser'
import { IGetUserByEmail } from '../../../domain/user/use-cases/getUserByEmail'

export class UpdateUserController implements IController {
  constructor (
    private readonly updateUser: IUpdateUser,
    private readonly getUserByEmail: IGetUserByEmail
  ) {}

  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const id = Number(req.params.id)
      const { email } = req.body
      if (email != null) {
        const exists = await this.getUserByEmail.get(email)
        if (exists != null) {
          return conflict(`E-mail ${email as string} already exists`)
        }
      }
      const user = await this.updateUser.update(id, req.body)
      return ok(user)
    } catch (error) {
      console.error(`Error updating user: ${String(error)}`)
      return serverError()
    }
  }
}
