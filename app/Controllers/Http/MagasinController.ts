

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Magasin from "App/Models/Magasin";
import User from "App/Models/User";

export default class MagasinController {
  public async index( {auth} : HttpContextContract) {
    let magasins : Magasin[] = [];
    let user = await User.query().where('id', auth.user?.id!).preload('magasin_gerer').firstOrFail();
    let magasinsList = await Magasin.query().where('user_id', auth.user?.id!).preload('gerant');
    let magasin  = await Magasin.query().where('id', user.magasin_gerer!.id).firstOrFail();
    magasins.push(magasin);
    magasins.push(...magasinsList);
    console.log(magasins.length)
    return magasins;
  }

  public async store({request, response,auth}: HttpContextContract) {
    let magasin = new Magasin();
    let data = request.all()
    magasin.name = data.name
    magasin.userId = auth.user?.id!;
    const user = await User.query().where('id', auth.user?.id!).firstOrFail();
    magasin = await magasin.save();
    user.related('magasins').save(magasin);
    response.status(200).json(magasin);
  }

  public async show({params}: HttpContextContract) {
    const id = params.id;
    const magasin = await Magasin.query().where('id', id).first();
    
    return magasin;
  }

  public async update({request, params}: HttpContextContract) {
    let magasin = await Magasin.findOrFail(params.id);
    let data = request.all()
    magasin.name = data.name
    magasin = await magasin.save();
    return magasin;
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id;
    await Magasin.query().where('id',id).delete();
    return response.status(200).json({message: "Magasin supprimer avec succes"});
  }

}

