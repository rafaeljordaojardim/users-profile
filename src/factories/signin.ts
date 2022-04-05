import { IGenerateTokenRepo, IGetUserByEmailRepo } from '../data/interfaces'
import { DBSignInUser } from '../data/user/dbSignIn'
import { UserPostgresRepo } from '../infra/user/userPostgresRepo'
import { SignInController } from '../presentation/controllers/user/signin'
import { IController } from '../presentation/interfaces/controller'
import { GenerateTokenRepo } from '../infra/token/generateToken'
import { ActionProfilePostgresRepo } from '../infra/action-profile/actionProfilePostgresRepo'
import { IGetActionsFromProfileRepo } from '../data/interfaces/getActionsFromProfile'

export const makeSignInUser = (): IController => {
  const generateToken: IGenerateTokenRepo = new GenerateTokenRepo()
  const getUserByEmailRepo: IGetUserByEmailRepo = new UserPostgresRepo()
  const getActionsFromProfileId: IGetActionsFromProfileRepo = new ActionProfilePostgresRepo()
  const dbGetUserByEmail = new DBSignInUser(getUserByEmailRepo, generateToken, getActionsFromProfileId)
  return new SignInController(dbGetUserByEmail)
}
