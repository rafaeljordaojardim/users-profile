import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ActionDb, ActionProfileDb, ProfileDb, UserDb } from '.'
import database from '../config/database'

const models = [
  ActionDb,
  ActionProfileDb,
  ProfileDb,
  UserDb
]

export const init = (): Sequelize => {
  const sequelize = new Sequelize(database as SequelizeOptions)
  sequelize.addModels([...models])
  return sequelize
}
