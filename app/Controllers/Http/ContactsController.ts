import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from "App/Models/Contact";
import Logger from "@ioc:Adonis/Core/Logger";

export default class ContactsController {
    
  public async index(){
    const contacts=  await Contact.all()
    return contacts;
  }

  public async store({request,response}: HttpContextContract){
    const contact =  new Contact();
    const data = request.all()
    contact.numero = data.numero
    contact.email = data.email
    contact.message = data.message
    contact.sujet = data.sujet
    contact.nom = data.nom
    await contact.save()
    response.status(200).json({ message : "Message  enregistrer avec success"   });
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    const contact = await Contact.query().where('id', id).first();
    return contact;
  }

  


  public async update({request, params}: HttpContextContract){
    const contact = await Contact.findOrFail(params.id);
    const data = request.all()
    contact.numero = data.numero
    contact.email = data.email
    contact.message = data.message
    contact.nom = data.name
    await contact.save()
    Logger.info("Contact modifier avec succes")
    return Contact;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const contact = await Contact.findOrFail(id);
    await  contact?.delete();
    Logger.info("Contact  avec l'id " + id + " supprimer avec succes")
    return response.status(200).json({ message : "Categorie supprimer avec succes" });
  }
}
