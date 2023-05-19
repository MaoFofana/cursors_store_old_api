import { DateTime } from 'luxon'
import {
  column,
  BaseModel, hasMany, HasMany, belongsTo,BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";
import Categorie from './Categorie';
import User from './User';
export default class Magasin extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string

  @column({
    serialize : (value : number)=>{
      return Boolean(value);
    }
  })
  public principale : boolean

  @column()
  public adresse : string

  @column()
  public description : string

  @column()
  public image : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



  @hasMany(()=> Categorie)
  public categories : HasMany<typeof Categorie>


  @hasMany(()=> Product)
  public products : HasMany<typeof Product>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>


  @column()
  public gerant_id : number

  @belongsTo(() => User, {
    foreignKey : "gerant_id"
  })
  public gerant : BelongsTo<typeof User>
}
