import { ISignIn } from '../../domain/user/use-cases/signin'
import { IGenerateTokenRepo, IGetUserByEmailRepo } from '../interfaces'
import { UnauthorizedError } from '../errors'
import { IGetActionsFromProfileRepo } from '../interfaces/getActionsFromProfile'

export class DBSignInUser implements ISignIn {
  constructor (
    private readonly getUserByEmail: IGetUserByEmailRepo,
    private readonly generateToken: IGenerateTokenRepo,
    private readonly getActionsByProfileId: IGetActionsFromProfileRepo
  ) {}

  public async login (email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail.getByEmail(email, true)
    if (user == null) {
      throw new UnauthorizedError('email or password incorrect!')
    }
    if (user.password !== password) {
      throw new UnauthorizedError('email or password incorrect!')
    }
    const actions = await this.getActionsByProfileId.getActionsFromProfile(user?.profileId)
    return this.generateToken.generate(email, {
      name: user.firstName + ' ' + user.lastName,
      profileId: user.profileId,
      actions: actions.map(action => ({ name: action.actionName, number: action.actionNumber }))
    })
  }
}
