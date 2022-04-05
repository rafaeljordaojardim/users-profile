import { Profile } from '../../../entities/profile'

export interface IUpdateProfileParams {
  name: string
  actions: number[]
}

export interface IUpdateProfile {
  update: (id: number, body: IUpdateProfileParams) => Promise<Profile>
}
