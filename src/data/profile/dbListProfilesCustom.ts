/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ICustomProfileResponse, IGetProfilesCustom } from '../../domain/profile/use-cases/getProfilesCustom'
import { IGetActionsFromProfileRepo } from '../interfaces/getActionsFromProfile'
import { IGetProfilesRepo } from '../interfaces/getProfilesRepo'
import { IGetUsersFromProfileRepo } from '../interfaces/getUsersFromProfileRepo'

export class DBListProfilesCustom implements IGetProfilesCustom {
  constructor (
    private readonly getProfiles: IGetProfilesRepo,
    private readonly getUsersFromProfile: IGetUsersFromProfileRepo,
    private readonly getActionsFromProfile: IGetActionsFromProfileRepo
  ) {}

  public async getProfilesCustom (): Promise<ICustomProfileResponse[]> {
    const profiles = await this.getProfiles.get()
    if (profiles.length <= 0) {
      return []
    }
    const customResponse: ICustomProfileResponse[] = [] as ICustomProfileResponse[]
    for (const profile of profiles) {
      const [usersFromProfile, actionsProfile] = await Promise.all([
        this.getUsersFromProfile.getUsersFromProfile(profile.id),
        this.getActionsFromProfile.getActionsFromProfile(profile.id)
      ])
      console.log(JSON.stringify(usersFromProfile))
      const users = usersFromProfile.map((user) => user.name)
      const actions = actionsProfile.map((action) => action.actionName)
      customResponse.push({
        id: profile.id,
        name: profile.name,
        users,
        actions
      })
    }
    return customResponse
  }
}
