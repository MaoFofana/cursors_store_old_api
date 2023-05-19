import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Stock from "App/Models/Stock";
import Image from "App/Models/Image";
import Product from "App/Models/Product";
import { DateTime } from 'luxon';
export default class StockController {
  public async index(){
    const stocks = await Stock.query().preload('product');
    return stocks;
  }

  public async store({request,response, auth}: HttpContextContract){
    let stocka =  new Stock();
    let data = request.all()
    stocka.quantity_entree = data.quantity_entree;
    stocka.productId = data.product_id;
    stocka.quantity_sortie = data.quantity_sortie;
    stocka.userId = auth.user!.id;
    
    if(stocka.productId){
      let item = await Product.query().where('id', stocka.productId).firstOrFail();
      item.quantity += stocka.quantity_entree;
      stocka.quantity = item.quantity;
      item.related("stocks").save(stocka); 
    }
   // var returnValue = await Stock.query().where('id', stocka.id).preload('product').firstOrFail();
    response.status(200).json(stocka);
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    return await Stock.query().where('id', id).preload('product').firstOrFail();
  }


  public async getByPeriode({params}: HttpContextContract){
    const end = params.end
   const start = params.start
   const startDate = DateTime.fromMillis(Number.parseInt(start))
   const endDate =  DateTime.fromMillis(Number.parseInt(end))
    var stocks =  await Stock.query()
    .whereBetween('created_at', [startDate.toString(), endDate.toString()]).preload('product');
    console.log(stocks);
    return stocks;
  }


  public async getByPeriodeAndProduct({params}: HttpContextContract){
    const end = params.end
   const start = params.start;
   const id = params.id;
   const startDate = DateTime.fromMillis(Number.parseInt(start))
   const endDate =  DateTime.fromMillis(Number.parseInt(end))
   
    return await Stock.query()
    .whereBetween('created_at', [startDate.toString(), endDate.toString()]).andWhere('product_id', id).preload('product');
  }


  public async update({request, params}: HttpContextContract){
    const stocka = await Stock.query().where('id', params.id).firstOrFail();
    let data = request.all()
    stocka.quantity_entree = data.quantity;
    stocka.productId = data.product_id;  
    return stocka;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    await Image.query().where('stock_id', id).delete();
    const stock = await Stock.query().where('id', id).firstOrFail();
    await  stock?.delete();
    return response.status(200).json({ message : "Stock supprimer avec succes" });
  }
}
