
import { Profile } from '../../entities/profile'

export interface IUpdateProfileRepo {
  update: (id: number, name: string) => Promise<Profile>
}
