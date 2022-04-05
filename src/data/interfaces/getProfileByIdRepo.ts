import { Profile } from '../../entities/profile'

export interface IGetProfileByIdRepo {
  getById: (id: number) => Promise<Profile | undefined>
}
