import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'
import { ActionDb } from './Action'
import { ActionProfileDb } from './ActionProfile'

@Table({ tableName: 'profiles' })
export class ProfileDb extends Model {
  @BelongsToMany(() => ActionDb, () => ActionProfileDb)
  actions: ActionDb[]

  @Column
  name: string

  @Column({ field: 'created_at' })
  createdAt: Date

  @Column({ field: 'updated_at' })
  updatedAt: Date
}
