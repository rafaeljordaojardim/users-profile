import { ICreateProfileRepo } from '../../data/interfaces/createProfileRepo'
import { IGetProfileByIdRepo } from '../../data/interfaces/getProfileByIdRepo'
import { IGetProfilesRepo } from '../../data/interfaces/getProfilesRepo'
import { IUpdateProfileRepo } from '../../data/interfaces/updateProfileRepo'
import { ActionDb, ProfileDb } from '../../db/models'
import { Profile } from '../../entities/profile'
import { LoggerThrow } from '../../utils/loggerThrow'

export class ProfilePostgresRepo implements ICreateProfileRepo, IGetProfileByIdRepo, IUpdateProfileRepo, IGetProfilesRepo {
  public async update (id: number, name: string): Promise<Profile> {
    const [, [profileUpdated]] = await ProfileDb.update({ name }, {
      where: { id },
      returning: true
    })
    return Profile.convertFromDb(profileUpdated)
  }

  public async getById (id: number): Promise<Profile | undefined> {
    const profileFromDb = await ProfileDb.findByPk(id, { include: [{ model: ActionDb, as: 'actions', through: { attributes: [] } }] })
    if (profileFromDb != null) {
      return Profile.convertFromDb(profileFromDb)
    }
    LoggerThrow.error(`Não há profile com o id ${id}`)
  }

  public async get (): Promise<Profile[]> {
    const profiles = await ProfileDb.findAll({ include: [{ model: ActionDb, as: 'actions', through: { attributes: [] } }] })
    return profiles.map(Profile.convertFromDb)
  }

  public async create (name: string): Promise<Profile> {
    const profileCreated = await ProfileDb.create({ name })
    return Profile.convertFromDb(profileCreated)
  }
}
