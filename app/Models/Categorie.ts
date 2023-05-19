import { DateTime } from 'luxon'
import {
  column,
  BaseModel, hasMany, HasMany,belongsTo, BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";
import User from './User';
export default class Categorie extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string

  @column()
  public description : string

  @column()
  public image : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @column()
  public categorieId: number

  @belongsTo(() => Categorie)
  public categorie : BelongsTo<typeof Categorie>

  
  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>


  @hasMany(() =>  Categorie)
  public categories : HasMany<typeof  Categorie>

  @hasMany(()=> Product)
  public products : HasMany<typeof Product>


}
