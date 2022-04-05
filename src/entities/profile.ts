import { ProfileDb } from '../db/models'
import { Action } from './action'

export class Profile {
  public id: number
  public name: string
  public actions: Action[]

  public static convertFromDb (profileDb: ProfileDb): Profile {
    const profile = new Profile()
    profile.id = profileDb.id
    profile.name = profileDb.name
    if (profileDb?.actions != null && profileDb.actions.length > 0) {
      profile.actions = profileDb.actions.map(pfDb => Action.convertFromDb(pfDb))
    }
    return profile
  }
}
