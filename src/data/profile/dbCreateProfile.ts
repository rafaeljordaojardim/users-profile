/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ICreateProfile } from '../../domain/profile/use-cases/createProfile'
import { Action } from '../../entities/action'
import { Profile } from '../../entities/profile'
import { ICreateActionProfileRepo } from '../interfaces/createActionProfileRepo'
import { ICreateProfileRepo } from '../interfaces/createProfileRepo'
import { IGetActionByNumberRepo } from '../interfaces/getActionByNumberRepo'

export class DBCreateProfile implements ICreateProfile {
  constructor (
    private readonly createProfile: ICreateProfileRepo,
    private readonly getActionByNumber: IGetActionByNumberRepo,
    private readonly createActionProfile: ICreateActionProfileRepo
  ) {}

  public async create (name: string, actions: number[]): Promise<Profile> {
    const profile = await this.createProfile.create(name)
    if (profile.id) {
      console.log(`Profile ${profile.name} created`)
      const actionsFromDb: Action[] = []
      for (const action of actions) {
        const actionFromDb = await this.getActionByNumber.get(action)
        if (actionFromDb) {
          actionsFromDb.push(actionFromDb)
        }
      }
      if (!actionsFromDb.length) {
        throw new Error(`Error: There is no actions on database with the action number passed '${String(actions)}'`)
      }
      await this.createActionProfile.create(profile.id, actionsFromDb)
      profile.actions = actionsFromDb
    }
    return profile
  }
}
