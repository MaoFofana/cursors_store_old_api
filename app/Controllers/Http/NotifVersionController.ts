import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import NotifVersion from "App/Models/NotifVersion";


export default class NotifVersionController {

  public async index() {
     return  await NotifVersion.all();
  }

  public async store({request, response}: HttpContextContract) {
    let notifVersion = new NotifVersion();
    let data = request.all() 
    notifVersion.title = data.message
    notifVersion.message = data.message 
    notifVersion.feature = data.feature
    notifVersion.version = data.version
    await notifVersion.save();
    response.status(200).json(notifVersion);
  }

  public async show({params}: HttpContextContract) {
    const id = params.id;
    const notifVersion = await NotifVersion.query().where('id', id).first();  
    return notifVersion;
  }


  public async getLastNotifVersion() {
    const notifVersion = await NotifVersion.query().orderBy('id', "desc").first();  
    return notifVersion;
  }

  public async update({request, params, response}: HttpContextContract) {
    let notifVersion = await NotifVersion.findOrFail(params.id);
    let data = request.all() 
    notifVersion.title = data.message
    notifVersion.message = data.message 
    notifVersion.feature = data.feature
    await notifVersion.save();
    return response.status(200).json(notifVersion);
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id;
    var notifVersion = await NotifVersion.query().where('id',id).firstOrFail();
    notifVersion.delete();
    return response.status(200).json({message: "NotifVersion supprimer avec succes"});
  }

}

