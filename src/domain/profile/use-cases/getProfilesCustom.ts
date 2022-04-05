
export interface ICustomProfileResponse {
  id: number
  name: string
  users: string[]
  actions: string[]
}

export interface IGetProfilesCustom {
  getProfilesCustom: () => Promise<ICustomProfileResponse[]>
}
