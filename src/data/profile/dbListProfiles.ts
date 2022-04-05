/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IGetProfiles } from '../../domain/profile/use-cases/getProfiles'
import { Profile } from '../../entities/profile'
import { IGetProfilesRepo } from '../interfaces/getProfilesRepo'

export class DBListProfiles implements IGetProfiles {
  constructor (
    private readonly getProfiles: IGetProfilesRepo
  ) {}

  public async get (): Promise<Profile[]> {
    const result = await this.getProfiles.get()
    return result
  }
}
