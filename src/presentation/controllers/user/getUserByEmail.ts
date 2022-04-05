import { IGetUserByEmail } from '../../../domain/user/use-cases/getUserByEmail'
import { ok, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { Request, Response } from 'express'
import { IResponse } from '../../interfaces/response'
export class GetUserByEmailController implements IController {
  constructor (
    private readonly getUserByEmail: IGetUserByEmail) {}

  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const { email } = req.params
      const user = await this.getUserByEmail.get(email)
      return ok({ user })
    } catch (error) {
      console.error(`Error getting user: ${String(error)}`)
      return serverError()
    }
  }
}
