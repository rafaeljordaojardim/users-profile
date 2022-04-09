import { ISignIn, ISigninRes } from '../../domain/user/use-cases/signin'
import { IGetUserByEmailRepo } from '../interfaces'
import { UnauthorizedError } from '../errors'
import { IGetActionsFromProfileRepo } from '../interfaces/getActionsFromProfile'

export class DBSignInUser implements ISignIn {
  constructor (
    private readonly getUserByEmail: IGetUserByEmailRepo,
    private readonly getActionsByProfileId: IGetActionsFromProfileRepo
  ) {}

  public async login (email: string, password: string): Promise<ISigninRes> {
    const user = await this.getUserByEmail.getByEmail(email, true)
    if (user == null) {
      throw new UnauthorizedError('email or password incorrect!')
    }
    if (user.password !== password) {
      throw new UnauthorizedError('email or password incorrect!')
    }
    const actions = await this.getActionsByProfileId.getActionsFromProfile(user?.profileId)
    return  {
      email,
      name: user.firstName + ' ' + user.lastName,
      profileId: user.profileId,
      actions: actions.map(action => ({ name: action.actionName, number: action.actionNumber }))
    }
  }
}
