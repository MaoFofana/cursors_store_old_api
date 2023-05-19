import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code : string

  @column()
  public reduction : number

  @column()
  public start : DateTime

  @column()
  public end : DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
