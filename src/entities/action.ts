import { ActionDb } from '../db/models'

export class Action {
  public id?: number
  public name: string
  public actionNumber: number

  public static convertFromDb (actionDb: ActionDb): Action {
    const action = new Action()
    action.id = actionDb.id
    action.name = actionDb.name
    action.actionNumber = actionDb.actionNumber
    return action
  }
}
