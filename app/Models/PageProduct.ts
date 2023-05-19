import { DateTime } from 'luxon'
import {
  column,
  BaseModel, belongsTo, BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Product from './Product';

export default class PageProduct extends BaseModel {

  @column({ isPrimary: true })
  public id: number

 // public lien : string //nom de l'entreprise + nom du produit


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


