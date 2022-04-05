import { Profile } from '../../entities/profile'

export interface ICreateProfileRepo {
  create: (name: string) => Promise<Profile>
}
