import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Image from "App/Models/Image";
import Product from "App/Models/Product";

export default class ImageController {
  public async index(){
    const images =  await Image.all()
    return images;
  }

  public async store({request,response}: HttpContextContract){
    const image =  new Image();
    const data = request.all()
    image.url = data.url
    await image.save();
    if(data.product_id){
      const product = await  Product.query().where('id', data.product_id).first();
      await image.related('product').associate(product!)
    } 
    response.status(200).json({ message : "image enregistrer avec success"   });
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    const image = await Image.query().where('id', id).firstOrFail();
    return image;
  }

  public async update({request, params}: HttpContextContract){
    const image = await Image.findOrFail(params.id);
    const data = request.all()
    console.log('DD')
    image.url  = data.url
    await  image!.save();
    return image;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const image = await Image.findOrFail(id);
    await  image?.delete();
    return response.status(200).json({ message : "Image supprimer avec succes" });
  }
  public async destroyByUrl({params, response}: HttpContextContract){
    const url = params.url;
    const image = await Image.query().where('url', url).first();
    await  image?.delete();
    return response.status(200).json({ message : "Image supprimer avec succes" });
  }
}
