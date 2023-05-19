import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class FraisLivraison extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public lieu : string

  @column()
  public min : number

  @column()
  public max : number

  @column()
  public price  : number

  @column()
  public status : boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
