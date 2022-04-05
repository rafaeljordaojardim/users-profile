
export class ActionProfile {
  public id?: number
  public profileId: number
  public actionId: number
  public actionNumber: number
  public actionName: string

  public static convertFromDb (row: any): ActionProfile {
    const actionProfile = new ActionProfile()
    actionProfile.id = row.id
    actionProfile.profileId = row.profile_id
    actionProfile.actionId = row.action_id
    actionProfile.actionName = row.name
    actionProfile.actionNumber = row.action_number
    return actionProfile
  }
}
