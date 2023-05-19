import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Order from "App/Models/Order";
import Product from "App/Models/Product";
import User from './User';

export default class PanierProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public  quantite : number

  @column()
  public name : string

  @column()
  public image : string

  @column()
  public price : number

  @column()
  public orderId: number

  @belongsTo(()=> Order)
  public order : BelongsTo<typeof Order>

  @column()
  public productId: number

  @belongsTo(()=> Product)
  public product : BelongsTo<typeof Product>

  @column()
  public userId: number

  @belongsTo(()=> User)
  public user : BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}




