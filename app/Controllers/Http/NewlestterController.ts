import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import NewLestter from "App/Models/NewLestter";

export default class NewLesterController {
  public async index(){
    const newlestter =  await NewLestter.all()
    return newlestter;
  }

  public async store({request,response}: HttpContextContract){
    const newlestter =  new NewLestter();
    const data = request.all()
    newlestter.email = data.email
    newlestter.name = data.name;
    console.log(newlestter.email);
    await newlestter.save();
    response.status(200).json({ message : "NewLestter enregistrer avec success"   });
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    const newlestter = await NewLestter.query().where('id', id).first();
    return newlestter;
  }

  public async update({request, params}: HttpContextContract){
    const newlestter = await NewLestter.findOrFail(params.id);
    const data = request.all()
    newlestter.email = data.email

    await  newlestter.save();
    return newlestter;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const newlestter = await NewLestter.findOrFail(id);
    await  newlestter.delete();
    return response.status(200).json({ message : "NewLestter supprimer avec succes" });
  }
}
