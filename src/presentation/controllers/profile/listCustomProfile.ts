import { created, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { IResponse } from '../../interfaces/response'
import { Request, Response } from 'express'
import { IGetProfilesCustom } from '../../../domain/profile/use-cases/getProfilesCustom'

export class ListCustomProfilesController implements IController {
  constructor (private readonly listCustomProfiles: IGetProfilesCustom) {}
  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const response = await this.listCustomProfiles.getProfilesCustom()
      return created({ profiles: response })
    } catch (error) {
      console.error(`Error listing custom profiles: ${String(error)}`)
      return serverError()
    }
  }
}
