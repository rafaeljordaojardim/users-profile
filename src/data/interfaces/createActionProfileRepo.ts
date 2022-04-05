import { Action } from '../../entities/action'

export interface ICreateActionProfileRepo {
  create: (profileId: number, actions: Action[]) => Promise<void>
}
