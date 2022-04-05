import { User } from '../../entities/user'

export interface IGetUsersFromProfileRepo {
  getUsersFromProfile: (profileId: number) => Promise<User[]>
}
