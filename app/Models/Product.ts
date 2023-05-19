import { DateTime } from 'luxon'
import {
  column,
  BaseModel, hasMany, HasMany, belongsTo, BelongsTo,beforeFetch, ModelQueryBuilderContract, hasOne, HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Categorie from "App/Models/Categorie";
import Image from "App/Models/Image";
import PanierProduct from "App/Models/PanierProduct";
import Stock from './Stock';
import Magasin from './Magasin';
import User from './User';
import PageProduct from './PageProduct';

export default class Product extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public code : string

  @column()
  public code_link: string
  
  @column()
  public name : string

  @column()
  public sluk : string

  @column()
  public unite : string

  @column()
  public quantity : number

  @column()
  public seuil : number

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

  @column()
  public weight :  number

  @column()
  public categorieId: number

  @belongsTo(()=> Categorie)
  public categorie : BelongsTo<typeof Categorie>

  @column()
  public magasinId: number

  @belongsTo(()=> Magasin)
  public magasin : BelongsTo<typeof Magasin>


  @hasMany(() =>  Image)
  public images : HasMany<typeof  Image>


  @hasMany(()=> PanierProduct)
  public panier_products : HasMany<typeof PanierProduct>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @hasMany(()=> Stock)
  public stocks : HasMany<typeof Stock>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>

  @hasOne(() => PageProduct)
  public page_product : HasOne<typeof PageProduct>

  @beforeFetch()
  public static withoutSoftDeletes(query: ProductQuery) {
    query.preload('images');
  }
}

type ProductQuery = ModelQueryBuilderContract<typeof Product>

