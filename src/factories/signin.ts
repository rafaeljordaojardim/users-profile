import { IGetUserByEmailRepo } from '../data/interfaces'
import { DBSignInUser } from '../data/user/dbSignIn'
import { UserPostgresRepo } from '../infra/user/userPostgresRepo'
import { SignInController } from '../presentation/controllers/user/signin'
import { IController } from '../presentation/interfaces/controller'
import { ActionProfilePostgresRepo } from '../infra/action-profile/actionProfilePostgresRepo'
import { IGetActionsFromProfileRepo } from '../data/interfaces/getActionsFromProfile'

export const makeSignInUser = (): IController => {
  const getUserByEmailRepo: IGetUserByEmailRepo = new UserPostgresRepo()
  const getActionsFromProfileId: IGetActionsFromProfileRepo = new ActionProfilePostgresRepo()
  const dbGetUserByEmail = new DBSignInUser(getUserByEmailRepo, getActionsFromProfileId)
  return new SignInController(dbGetUserByEmail)
}
