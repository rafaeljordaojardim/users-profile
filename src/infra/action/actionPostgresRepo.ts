import { IGetActionByNumberRepo } from '../../data/interfaces/getActionByNumberRepo'
import { ActionDb } from '../../db/models'
import { Action } from '../../entities/action'

export class ActionPostgresRepo implements IGetActionByNumberRepo {
  public async get (actionNumber: number): Promise<Action | undefined> {
    const actionDb = await ActionDb.findOne({ where: { actionNumber } })
    if (actionDb != null) {
      return Action.convertFromDb(actionDb)
    }
  }
}
