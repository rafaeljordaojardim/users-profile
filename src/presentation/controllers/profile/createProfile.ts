import { created, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { IResponse } from '../../interfaces/response'
import { Request, Response } from 'express'
import { ICreateProfile } from '../../../domain/profile/use-cases/createProfile'

export class CreateProfileController implements IController {
  constructor (private readonly createProfile: ICreateProfile) {}
  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const name = req.body.name
      const actions = req.body.actions
      const response = await this.createProfile.create(name, actions)
      return created({ profile: response })
    } catch (error) {
      console.error(`Error creating profile: ${String(error)}`)
      return serverError()
    }
  }
}
