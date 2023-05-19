

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class NotifVersion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title : string
  @column()
  public message : string

  @column()
  public version : string

  @column()
  public feature : string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
