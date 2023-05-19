

import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Unite  extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>
}
