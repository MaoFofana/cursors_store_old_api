
import { DateTime } from 'luxon'
import {
  column,
  BaseModel, hasMany, HasMany, belongsTo, BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Image from "App/Models/Image";
import User from './User';

export default class Service extends BaseModel {

  @column({ isPrimary: true })
  public id: number


  @column()
  public name : string

  @column()
  public sluk : string

 

  @column()
  public description : string

  @column()
  public price : number

  @column()
  public sale_price : number
  
  @column()
  public reduction : number
 
  @column({
    serialize : (value : number)=>{
      return Boolean(value);
    }
  })
  public active : boolean


  @hasMany(() =>  Image)
  public images : HasMany<typeof  Image>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>

}
