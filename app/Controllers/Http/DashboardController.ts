import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Stock from "App/Models/Stock";
import { DateTime } from 'luxon';
import Order from "App/Models/Order";
import Product from "App/Models/Product";


export default class DashboardController {

  public async getByPeriode({params, response, auth}: HttpContextContract){
    const end = params.end
    const start = params.start
    const startDate = DateTime.fromMillis(Number.parseInt(start))
    const endDate =  DateTime.fromMillis(Number.parseInt(end))

    let ajouter = 0;
    let sortie = 0;
    let inStock = 0;
    let commande = 0;
    let commandeTotal = 0;

    var stocks =  await Stock.query()
    .whereBetween('created_at', [startDate.toString(), endDate.toString()]).andWhere('user_id',  auth.user!.id!);

    var produits = await Product.query().andWhere('user_id',  auth.user!.id!);

   
    console.log(stocks.length);

    var commandes =  await Order.query()
    .whereBetween('created_at', [startDate.toString(), endDate.toString()]).andWhere('user_id', auth.user!.id!);
    commande = commandes.length;

    for(let stock of stocks){
        ajouter += stock.quantity_entree;
        sortie += stock.quantity_sortie;
    } 
    
    for(let product of produits){
      inStock += product.quantity;
    }
    return response.status(200).json({ajouter : ajouter, sortie : sortie, in_stock : inStock , commande : commande, commande_total : commandeTotal});
  }


}
