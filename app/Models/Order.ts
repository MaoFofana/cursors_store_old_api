import { DateTime } from 'luxon'
import {
  column,
  BaseModel, BelongsTo, hasMany, HasMany, belongsTo
} from '@ioc:Adonis/Lucid/Orm'

import User from "./User";
import PanierProduct from "App/Models/PanierProduct";


export default class Order extends BaseModel {

  @column({ isPrimary: true })
  public id: number
  @column()
  public avance :  number;
  @column()
  public reste : number;


  @column()
  public number : string

  @column()
  public status : string

  @column()
  public lieu : string


  @column()
  public client_name : string

  @column()
  public client_number : string

  @column()
  public discount_total : number


  @column()
  public shipping_total : number


  @column()
  public total : number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(()=> PanierProduct)
  public panier_products : HasMany<typeof PanierProduct>


  @column()
  public userId : number

  @belongsTo(()=> User)  
  public user : BelongsTo<typeof User>

  @column()
  public livreur_id : number

  @belongsTo(()=> User, {
    foreignKey : "livreur_id"
  })  
  public livreur : BelongsTo<typeof User>

}
