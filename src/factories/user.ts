import {
  ICreateUserRepo,
  IGetProfileByIdRepo,
  IGetUserByEmailRepo,
  IGetUserByIdRepo,
  IGetUsersRepo,
  IUpdateUserRepo
} from '../data/interfaces/'
import { IUpdateUserPasswordRepo } from '../data/interfaces/updateUserPassword'
import { DBCreateUser, DBGetUserByEmail, DBGetUsers, DBUpdateUser, FillUserWithAssociations } from '../data/user/'
import { DBUpdateUserPassword } from '../data/user/dbUpdateUserPassword'
import { IFillUserWithAssociations } from '../domain/user/use-cases/fillUserWithAssociations'
import { ProfilePostgresRepo } from '../infra/profile/profilePostgresRepo'
import { UserPostgresRepo } from '../infra/user/userPostgresRepo'
import {
  CreateUserController,
  GetUserByEmailController,
  GetUsersController,
  UpdateUserController
} from '../presentation/controllers/user'
import { UpdateUserPasswordController } from '../presentation/controllers/user/updateUserPassword'
import { IController } from '../presentation/interfaces/controller'

export const makeFillUserWithAssociations = (): IFillUserWithAssociations => {
  const getUserById: IGetUserByIdRepo = new UserPostgresRepo()
  const getProfileById: IGetProfileByIdRepo = new ProfilePostgresRepo()
  return new FillUserWithAssociations(getProfileById, getUserById)
}

export const makeCreateUser = (): IController => {
  const createUserRepo: ICreateUserRepo = new UserPostgresRepo()
  const getUserByEmailRepo: IGetUserByEmailRepo = new UserPostgresRepo()
  const dbGetUserByEmail = new DBGetUserByEmail(getUserByEmailRepo)
  const dbCreateUser = new DBCreateUser(createUserRepo)
  const fillUserWithAssociations = makeFillUserWithAssociations()
  return new CreateUserController(dbCreateUser, dbGetUserByEmail, fillUserWithAssociations)
}

export const makeGetUserByEmail = (): IController => {
  const getUserByEmailRepo: IGetUserByEmailRepo = new UserPostgresRepo()
  const dbGetUserByEmail = new DBGetUserByEmail(getUserByEmailRepo)
  return new GetUserByEmailController(dbGetUserByEmail)
}

export const makeGetUsers = (): IController => {
  const getUsersRepo: IGetUsersRepo = new UserPostgresRepo()
  const dbGetUsers = new DBGetUsers(getUsersRepo)
  return new GetUsersController(dbGetUsers)
}

export const makeUpdateUser = (): IController => {
  const updateUserRepo: IUpdateUserRepo = new UserPostgresRepo()
  const dbGetUsers = new DBUpdateUser(updateUserRepo)
  const getUserByEmailRepo: IGetUserByEmailRepo = new UserPostgresRepo()
  const dbGetUserByEmail = new DBGetUserByEmail(getUserByEmailRepo)
  return new UpdateUserController(dbGetUsers, dbGetUserByEmail)
}

export const makeUpdateUserPassword = (): IController => {
  const updateUserPasswordRepo: IUpdateUserPasswordRepo = new UserPostgresRepo()
  const getUserById: IGetUserByIdRepo = new UserPostgresRepo()
  const dbUpdateUserPassword = new DBUpdateUserPassword(updateUserPasswordRepo, getUserById)
  return new UpdateUserPasswordController(dbUpdateUserPassword)
}
