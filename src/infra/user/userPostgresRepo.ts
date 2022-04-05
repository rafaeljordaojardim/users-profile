import { ICreateUserRepo } from '../../data/interfaces/createUserRepo'
import { IGetUserByEmailRepo } from '../../data/interfaces/getUserByEmailRepo'
import { IGetUserByIdRepo } from '../../data/interfaces/getUserByIdRepo'
import { IGetUsersFromProfileRepo } from '../../data/interfaces/getUsersFromProfileRepo'
import { IGetUsersRepo } from '../../data/interfaces/getUsersRepo'
import { IUpdateUserPasswordRepo } from '../../data/interfaces/updateUserPassword'
import { IUpdateUserRepo } from '../../data/interfaces/updateUserRepo'
import { ActionDb, ProfileDb, UserDb } from '../../db/models'
import { User } from '../../entities/user'
import { IUser } from '../../presentation/interfaces/user'
import { makeGetUserQuery } from '../../utils/common'

export class UserPostgresRepo implements ICreateUserRepo, IGetUserByEmailRepo, IGetUsersRepo, IGetUserByIdRepo, IUpdateUserRepo, IGetUsersFromProfileRepo, IUpdateUserPasswordRepo {
  public async updatePassword (id: number, newPassword: string): Promise<void> {
    await UserDb.update({ password: newPassword }, { where: { id } })
  }

  public async update (id: number, body: any): Promise<User | undefined> {
    const [, [userUpdated]] = await UserDb.update({ ...body }, {
      where: { id },
      returning: true
    })
    return User.fromDbModel(userUpdated)
  }

  public async getById (id: number): Promise<User | undefined> {
    const user = await UserDb.findByPk(id, {
      include: [
        { model: ProfileDb, as: 'profile', include: [{ model: ActionDb }] }]
    })
    if (user != null) {
      return User.fromDbModel(user)
    }
  }

  public async create (user: IUser): Promise<User> {
    const userToSave = new UserDb({ ...user })
    const userCreated = await userToSave.save()
    if (userCreated == null) {
      throw new Error(`Error creating user: ${JSON.stringify(user)}`)
    }
    return User.fromDbModel(userCreated)
  }

  public async getByEmail (email: string, sensitiveInfo = false): Promise<User | undefined> {
    const query = makeGetUserQuery(email)
    const [user] = await UserDb.sequelize?.query(query) as IUser[]
    if (user[0] != null) {
      return User.convertFromRawQuery(user[0], sensitiveInfo)
    }
  }

  public async get (): Promise<User[] | undefined> {
    const query = makeGetUserQuery()
    const users = await UserDb.sequelize?.query(query)
    if (users != null) {
      return users[0].map(user => User.convertFromRawQuery(user))
    }
  }

  public async getUsersFromProfile (profileId: number): Promise<User[]> {
    const users = await UserDb.findAll({ where: { profileId } })
    return users.map((user) => User.convertToReturn(user))
  }
}
