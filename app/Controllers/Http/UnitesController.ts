import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Unite from "App/Models/Unite";
import User from "App/Models/User";


export default class UnitesController {
  public async index({auth} :HttpContextContract ) {
    const unites = await Unite.query().where('user_id', auth.user?.id!);
    return unites ? unites : [];
  }

  public async store({request, response, auth}: HttpContextContract) {
    let unite = new Unite();
    let data = request.all()
    unite.name = data.name
    unite = await unite.save();
    let user = await User.query().where('id', auth.user!.id!).firstOrFail();
    user.related('unites').save(unite);
    response.status(200).json(unite);
  }

  public async show({params}: HttpContextContract) {
    const id = params.id;
    const unite = await Unite.query().where('id', id).first();
    
    return unite;
  }

  public async update({request, params}: HttpContextContract) {
    let unite = await Unite.findOrFail(params.id);
    let data = request.all()
    unite.name = data.name
    unite = await unite.save();
    return unite;
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id;
    await Unite.query().where('id',id).delete();
    return response.status(200).json({message: "Unite supprimer avec succes"});
  }

}

