import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Notification from "App/Models/Notification";
import Ws from "App/Services/Ws";

export default class NotificationsController {
  public async index(){
    const Notifications =  await Notification.all()
    return Notifications;
  }

  public async store({request,response}: HttpContextContract){
    const notification =  new Notification();
    const data = request.all()
    notification.title = data.title
    notification.message = data.message
    notification.lu = data.lu
    await notification.save();
    Ws.io.emit('notifications', {title : notification.title, message : notification.message})
    response.status(200).json({ message : "Notification enregistrer avec success"   });
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    const notification = await Notification.query().where('id', id).first();
    return notification;
  }

  public async update({request, params}: HttpContextContract){
    const notification = await Notification.findOrFail(params.id);
    const data = request.all()
    notification.title = data.title
    notification.message = data.messag
    notification.lu = data.lu
    await  notification.save();
    return notification;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const notification = await Notification.findOrFail(id);
    await  notification.delete();
    return response.status(200).json({ message : "Notification supprimer avec succes" });
  }
}
