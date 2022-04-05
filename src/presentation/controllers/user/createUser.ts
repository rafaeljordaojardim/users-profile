import { ICreateUser } from '../../../domain/user/use-cases/createUser'
import { IController } from '../../interfaces/controller'
import { IResponse } from '../../interfaces/response'
import { Request, Response } from 'express'
import { created, serverError, conflict } from '../../commons/responses'
import { IFillUserWithAssociations } from '../../../domain/user/use-cases/fillUserWithAssociations'
import { IGetUserByEmail } from '../../../domain/user/use-cases/getUserByEmail'
import { IUser } from '../../interfaces/user'

export class CreateUserController implements IController {
  constructor (
    private readonly createUser: ICreateUser,
    private readonly getUserByEmail: IGetUserByEmail,
    private readonly fillUserWithAssociations: IFillUserWithAssociations
  ) {}

  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const userParams: IUser = req.body
      const exists = await this.getUserByEmail.get(userParams.email)
      if (exists != null) {
        return conflict(`E-mail ${userParams.email} already exists`)
      }
      let user = await this.createUser.create(userParams)
      user = await this.fillUserWithAssociations.fill(user)
      return created({ user })
    } catch (error) {
      console.error(`Error creating user: ${String(error)}`)
      return serverError()
    }
  }
}
