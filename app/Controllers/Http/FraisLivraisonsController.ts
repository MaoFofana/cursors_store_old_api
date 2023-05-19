import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import FraisLivraison from "App/Models/FraisLivraison";
import Logger from "@ioc:Adonis/Core/Logger";

export default class FraisLivraisonsController {

  public async index({response} : HttpContextContract){
    const fraisLivraisons = await FraisLivraison.all();
    response.status(200).json(fraisLivraisons)
  }




  public async store({request,response}: HttpContextContract){
    const fraisLivraison =  new FraisLivraison();
    const data = request.all()
    fraisLivraison.lieu = data.lieu
    fraisLivraison.min = data.min
    fraisLivraison.max = data.max
    fraisLivraison.status = data.status
    fraisLivraison.price = data.price
    await fraisLivraison.save()
    Logger.info("Frais de livraison enregister avec succes")
    response.status(200).json(fraisLivraison);
  }


  public async show({params}: HttpContextContract){
    const id = params.id;
    const frais = await FraisLivraison.findOrFail(id);
    return frais;
  }


  public async update({request, params, response}: HttpContextContract){
    const fraisLivraison = await FraisLivraison.findOrFail(params.id);
    const data = request.all()
    fraisLivraison.lieu = data.lieu
    fraisLivraison.min = data.min
    fraisLivraison.max = data.max
    fraisLivraison.status = data.status
    fraisLivraison.price = data.price

    await fraisLivraison.save();
    Logger.info("Frais de livraison modifier avec succes")
    response.status(200).json(fraisLivraison);
  }


  public async destroy({params, response}: HttpContextContract){
    const fraisLivraison = await FraisLivraison.findOrFail(params.id);
    await  fraisLivraison.delete();
    Logger.info("Frais de livraison supprimé avec succes")
    return response.status(200).json({ message : "Frais de livraison supprimer avec succes" });
  }
}
