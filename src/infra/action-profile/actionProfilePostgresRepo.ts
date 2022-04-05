import { ICreateActionProfileRepo } from '../../data/interfaces/createActionProfileRepo'
import { IDeleteAllActionsFromProfileRepo } from '../../data/interfaces/deleteAllActionsFromProfileRepo'
import { IGetActionsFromProfileRepo } from '../../data/interfaces/getActionsFromProfile'
import { ActionProfileDb } from '../../db/models'
import { Action } from '../../entities/action'
import { ActionProfile } from '../../entities/actionProfile'

export class ActionProfilePostgresRepo implements ICreateActionProfileRepo, IDeleteAllActionsFromProfileRepo, IGetActionsFromProfileRepo {
  public async create (profileId: number, actions: Action[]): Promise<void> {
    for (const action of actions) {
      const actionProfileDb = new ActionProfileDb()
      actionProfileDb.profileId = profileId
      if (action.id != null) {
        actionProfileDb.actionId = action?.id
      }
      await actionProfileDb.save()
    }
  }

  public async delete (profileId: number): Promise<void> {
    await ActionProfileDb.destroy(
      { where: { profileId } }
    )
  }

  public async getActionsFromProfile (profileId: number): Promise<ActionProfile[]> {
    const query = `SELECT * FROM action_profile ap
    INNER JOIN actions ac ON ac.id = ap.action_id
    where ap.profile_id = ${profileId}`
    const actionsProFile = await ActionProfileDb.sequelize?.query(query)
    if (actionsProFile != null) {
      return actionsProFile[0].map(ActionProfile.convertFromDb)
    }
    return []
  }
}
