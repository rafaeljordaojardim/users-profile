import { ActionProfile } from '../../entities/actionProfile'

export interface IGetActionsFromProfileRepo {
  getActionsFromProfile: (profileId: number) => Promise<ActionProfile[]>
}
