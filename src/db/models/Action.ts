import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'
import { ProfileDb, ActionProfileDb } from '.'

@Table({ tableName: 'actions' })
export class ActionDb extends Model {
  @Column
  name: string

  @Column({ field: 'action_number' })
  actionNumber: number

  @BelongsToMany(() => ProfileDb, () => ActionProfileDb)
  profiles: ProfileDb[]

  @Column({ field: 'created_at' })
  createdAt: Date

  @Column({ field: 'updated_at' })
  updatedAt: Date
}
