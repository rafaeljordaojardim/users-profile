import { User } from '../../../entities/user'

export interface IFillUserWithAssociations {
  fill: (user: User) => Promise<User>
}
