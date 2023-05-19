import { DateTime } from 'luxon'
import {  
  column,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import User from './User'


export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity_entree: number 
  @column()
  public quantity_sortie: number 
 
  @column()
  public quantity : number 

  @column()
  public prix : number 

  @column()
  public productId: number

  @belongsTo(()=> Product)
  public product : BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>

}
