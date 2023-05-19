import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Coupon from "App/Models/Coupon";
import {DateTime} from "luxon";
import Logger from "@ioc:Adonis/Core/Logger";

export default class CouponsController {

  public async index(){
    return await Coupon.all();
  }

  public async store({request,response}: HttpContextContract){
    const coupon =  new Coupon();
    const data = request.all()
    coupon.code = data.code
    coupon.reduction = data.reduction
    coupon.start = DateTime.fromJSDate(new Date(data.start))
    coupon.end = DateTime.fromJSDate(new Date(data.end))
    await coupon.save()
    response.status(200).json({ message : "Coupon enregistrer avec success"   });
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    const coupon = await Coupon.query().where('id', id).first();
    return coupon;
  }

  public async showByCodes({params}: HttpContextContract){
   return Coupon.query().where('code', params.code);
  }


  public async showByCode({params}: HttpContextContract){
    const coupon =  await Coupon.query().where('code', params.code).first();
    if(coupon) return coupon
    else return  new Coupon().reduction = 0;
  }



  public async update({request, params}: HttpContextContract){
    const coupon = await Coupon.findOrFail(params.id);
    const data = request.all()
    coupon.code = data.code
    coupon.reduction = data.reduction
    coupon.start = DateTime.fromJSDate(new Date(data.start))
    coupon.end = DateTime.fromJSDate(new Date(data.end))
    await coupon.save()
    Logger.info("Coupon modifier avec succes")
    return coupon;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const coupon = await Coupon.findOrFail(id);
    await  coupon?.delete();
    Logger.info("Coupon  avec l'id " + id + " supprimer avec succes")
    return response.status(200).json({ message : "Categorie supprimer avec succes" });
  }
}
