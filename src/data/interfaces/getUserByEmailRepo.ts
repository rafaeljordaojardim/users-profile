import { User } from '../../entities/user'

export interface IGetUserByEmailRepo {
  getByEmail: (email: string, sensitiveInfo: boolean) => Promise<User | undefined>
}
