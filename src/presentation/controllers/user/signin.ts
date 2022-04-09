import { ok } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { Request, Response } from 'express'
import { IResponse } from '../../interfaces/response'
import { ISignIn } from '../../../domain/user/use-cases/signin'
import { errorProcessor } from '../../../utils/common'

export class SignInController implements IController {
  constructor (
    private readonly signIn: ISignIn
  ) {}

  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const { email, password } = req.body
      const info = await this.signIn.login(email, password)
      return ok({ info })
    } catch (error) {
      console.error(`Error signing in user: ${String(error)}`)
      return errorProcessor(error)
    }
  }
}
