import { DateTime } from 'luxon'
import {  column,
BaseModel, hasMany, HasMany, belongsTo, BelongsTo, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Order from "App/Models/Order";
import PanierProduct from './PanierProduct';
import Magasin from './Magasin';
import Categorie from './Categorie';
import Unite from './Unite';
import Stock from './Stock';
import Product from './Product';
import PageProduct from './PageProduct';
import Service from './Service';


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public code_link: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public name : string

  @column()
  public sluk : string


  @column()
  public code : string

  @column()
  public firebase : string


  @column()
  public role : string

  @column({
    serialize : (value : number)=>{
      return Boolean(value);
    }
  })
  public  active : boolean

  @column()
  public avatarUrl : string

  @column()
  public phone : string

  
  @column()
  public adresse : string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
 

  @hasMany(()=> Order)
  public orders : HasMany<typeof Order>

  @column()
  public patron_id : number

  @belongsTo(()=> User,{
    foreignKey : "patron_id"
  })  
  public patron : BelongsTo<typeof User>

  @hasMany(()=> User, {
    foreignKey : "patron_id"
  })
  public gerants : HasMany<typeof User>

  @hasMany(() =>  Categorie)
  public categories : HasMany<typeof  Categorie>

  @hasMany(() =>  Unite)
  public unites : HasMany<typeof  Unite>

  @hasMany(()=> Magasin)
  public magasins : HasMany<typeof Magasin>

  @hasMany(() =>  Stock)
  public stocks : HasMany<typeof  Stock>

  @hasMany(() =>  Service)
  public services : HasMany<typeof  Service>

  @hasMany(() =>  Product)
  public products : HasMany<typeof  Product>

  @hasMany(() =>  PageProduct)
  public page_products : HasMany<typeof  PageProduct>

  @hasOne(()=> Magasin, {
    foreignKey : "gerant_id"
  })
  public magasin_gerer : HasOne<typeof Magasin>

  

  @hasMany(()=> PanierProduct)
  public paniers_products : HasMany<typeof PanierProduct>
}
