
export interface IDeleteAllActionsFromProfileRepo {
  delete: (profileId: number) => Promise<void>
}
