import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import { ActionDb, ProfileDb } from './'

@Table({ tableName: 'action_profile' })
export class ActionProfileDb extends Model {
  @ForeignKey(() => ActionDb)
  @Column({ field: 'action_id' })
  actionId: number

  @ForeignKey(() => ProfileDb)
  @Column({ field: 'profile_id' })
  profileId: number

  @Column({ field: 'created_at' })
  createdAt: Date

  @Column({ field: 'updated_at' })
  updatedAt: Date
}
