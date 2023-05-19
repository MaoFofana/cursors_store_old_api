import { DateTime } from 'luxon'
import {
  column,
  BaseModel,  belongsTo, BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";



export default class Image extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public url : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public productId: number

  @belongsTo(()=> Product)
  public product : BelongsTo<typeof Product>

}
