/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IUpdateProfile, IUpdateProfileParams } from '../../domain/profile/use-cases/updateProfile'
import { Action } from '../../entities/action'
import { Profile } from '../../entities/profile'
import { ICreateActionProfileRepo, IGetActionByNumberRepo, IGetProfileByIdRepo } from '../interfaces'
import { IDeleteAllActionsFromProfileRepo } from '../interfaces/deleteAllActionsFromProfileRepo'
import { IUpdateProfileRepo } from '../interfaces/updateProfileRepo'

export class DBUpdateProfile implements IUpdateProfile {
  constructor (
    private readonly updateProfileRepo: IUpdateProfileRepo,
    private readonly deleteAllActionsFromProfile: IDeleteAllActionsFromProfileRepo,
    private readonly getActionByNumber: IGetActionByNumberRepo,
    private readonly createActionProfile: ICreateActionProfileRepo,
    private readonly getProfileById: IGetProfileByIdRepo
  ) { }

  public async update (id: number, body: IUpdateProfileParams): Promise<Profile> {
    if (body.name) {
      await this.updateProfileRepo.update(id, body.name)
    }

    if (body.actions && body.actions.length > 0) {
      await this.deleteAllActionsFromProfile.delete(id)
      const actionsFromDb: Action[] = []
      for (const action of body.actions) {
        const actionFromDb = await this.getActionByNumber.get(action)
        if (actionFromDb) {
          actionsFromDb.push(actionFromDb)
        }
      }
      if (!actionsFromDb.length) {
        throw new Error(`Error: There is no actions on database with the action number passed '${String(body.actions)}'`)
      }
      await this.createActionProfile.create(id, actionsFromDb)
    }
    const profileUpdated = await this.getProfileById.getById(id)
    if (!profileUpdated) {
      throw new Error(`Error: profile ${id} does not exist`)
    }
    return profileUpdated
  }
}
