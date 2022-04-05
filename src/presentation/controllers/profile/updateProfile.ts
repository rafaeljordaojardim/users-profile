import { ok, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { IResponse } from '../../interfaces/response'
import { Request, Response } from 'express'
import { IUpdateProfile } from '../../../domain/profile/use-cases/updateProfile'

export class UpdateProfileController implements IController {
  constructor (private readonly updateProfile: IUpdateProfile) {}
  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const id = Number(req.params.id)
      const name = req.body.name
      const actions = req.body.actions
      const response = await this.updateProfile.update(id, { name, actions })
      return ok({ profile: response })
    } catch (error) {
      console.error(`Error updating profile: ${String(error)}`)
      return serverError()
    }
  }
}
