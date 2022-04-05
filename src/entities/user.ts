import { UserDb } from '../db/models'
import { Profile } from './profile'

export class User {
  public id?: number
  public name: string
  public firstName: string
  public password?: string
  public lastName: string
  public email: string
  public status: boolean
  public profileId: number
  public sectorId?: number
  public bossId?: number
  public sectorName?: string
  public bossName?: string
  public profileName?: string
  public profile?: Profile
  public boss?: User

  public static fromDbModel (userDb: UserDb): User {
    const user = new User()
    user.id = userDb.id
    user.password = userDb.password
    user.firstName = userDb.firstName
    user.lastName = userDb.lastName
    user.name = `${user.firstName.trim()} ${user.lastName.trim()}`
    user.email = userDb.email
    user.status = userDb.status
    user.bossId = userDb.bossId
    user.sectorId = userDb.sectorId
    user.profileId = userDb.profileId
    user.profileName = userDb.profile != null ? userDb.profile.name : undefined
    user.bossName = userDb.boss != null ? `${userDb.boss.firstName} ${userDb.boss.lastName}` : undefined
    return user
  }

  public static convertToReturn (userDb: UserDb): User {
    const boss = new User()
    boss.id = userDb.id
    boss.name = `${userDb.firstName.trim()} ${userDb.lastName.trim()}`
    boss.email = userDb.email
    return boss
  }

  public static convertToBoss (user: User): User {
    const boss = new User()
    boss.id = user.id
    boss.name = `${user.firstName.trim()} ${user.lastName.trim()}`
    boss.email = user.email
    return boss
  }

  public static convertFromRawQuery (row: any, sensitiveInfo = false): User {
    const user = new User()
    if (row.profile_name != null) {
      user.profileName = row.profile_name
    }

    if (sensitiveInfo && row.password != null) {
      user.password = row.password
    }

    if (row.first_name != null) {
      user.firstName = row.first_name
    }

    if (row.last_name != null) {
      user.lastName = row.last_name
    }

    if (row.email != null) {
      user.email = row.email
    }

    if (row.status != null) {
      user.status = row.status
    }

    if (row.status != null) {
      user.status = row.status
    }

    if (row.status != null) {
      user.status = row.status
    }

    if (row.status != null) {
      user.status = row.status
    }

    if (row.boss_first_name != null) {
      user.bossName = row.boss_first_name
    }

    if (row.boss_first_name != null) {
      user.bossName = row.boss_first_name
    }

    if (row.boss_id != null) {
      user.bossId = row.boss_id
    }

    if (row.profile_id != null) {
      user.profileId = row.profile_id
    }

    if (row.sector_id != null) {
      user.sectorId = row.sector_id
    }

    if (row.id != null) {
      user.id = row.id
    }

    return user
  }
}
