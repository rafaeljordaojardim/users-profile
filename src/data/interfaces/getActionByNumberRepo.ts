import { Action } from '../../entities/action'

export interface IGetActionByNumberRepo {
  get: (actionNumber: number) => Promise<Action | undefined>
}
