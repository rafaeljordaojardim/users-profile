import { Table, Column, Model, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript'
import { ProfileDb } from './Profile'

@Table({ tableName: 'users' })
export class UserDb extends Model {
  @Column({ field: 'first_name' })
  firstName: string

  @Column({ field: 'last_name' })
  lastName: string

  @Column
  email: string

  @Column
  password: string

  @Column
  status: boolean

  @ForeignKey(() => UserDb)
  @Column({ field: 'boss_id' })
  bossId: number

  @ForeignKey(() => ProfileDb)
  @Column({ field: 'profile_id' })
  profileId: number

  @Column({ field: 'sector_id' })
  sectorId: number

  @HasOne(() => ProfileDb, 'id')
  profile: ProfileDb

  @BelongsTo(() => UserDb, 'bossId')
  boss: UserDb

  @Column({ field: 'created_at' })
  createdAt: Date

  @Column({ field: 'updated_at' })
  updatedAt: Date
}
