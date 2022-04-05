import { Profile } from '../../../entities/profile'

export interface IGetProfiles {
  get: () => Promise<Profile[]>
}
