import { created, serverError } from '../../commons/responses'
import { IController } from '../../interfaces/controller'
import { IResponse } from '../../interfaces/response'
import { Request, Response } from 'express'
import { IGetProfiles } from '../../../domain/profile/use-cases/getProfiles'

export class ListProfilesController implements IController {
  constructor (private readonly listProfiles: IGetProfiles) {}
  public async handle (req: Request, res: Response): Promise<IResponse> {
    try {
      const response = await this.listProfiles.get()
      return created({ profiles: response })
    } catch (error) {
      console.error(`Error listing profiles: ${String(error)}`)
      return serverError()
    }
  }
}
