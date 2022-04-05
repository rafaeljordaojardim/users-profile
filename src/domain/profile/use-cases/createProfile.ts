import { Profile } from '../../../entities/profile'

export interface ICreateProfile {
  create: (name: string, actions: number[]) => Promise<Profile>
}
