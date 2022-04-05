import { Profile } from '../../entities/profile'

export interface IGetProfilesRepo {
  get: () => Promise<Profile[]>
}
