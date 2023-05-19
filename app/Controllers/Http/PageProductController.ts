import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import PageProduct from "App/Models/PageProduct";
import User from "App/Models/User";
import Product from "App/Models/Product";

export default class PageProductController {
  public async index(){
    const page_products = await PageProduct.query().preload('product').preload('user');
      return page_products;  
  }

  public async store({request,response, auth}: HttpContextContract){
    let user = await User.query().where('id', auth.user!.id).firstOrFail();
    let data = request.all()
    let product = await Product.query().where('id', data.product_id).firstOrFail();
    let page_product =  new PageProduct();
    page_product.productId = product.id;
    page_product.userId = user.id;
    page_product =  await page_product.save();
    response.status(200).json({ message : "Page Product enregistrer avec succes enregistrer avec success", id : page_product.id   });
  }





  public async show({params}: HttpContextContract){
    const id = params.id;
    return await PageProduct.query().where('id', id).preload("product").preload('user').firstOrFail();
  }



  public async update({request, params}: HttpContextContract){
    let page_product = await PageProduct.query().where('id', params.id).firstOrFail();
    let data = request.all()
    let product = await Product.query().where('id', data.product_id).firstOrFail();
    page_product.productId = product.id;
    page_product =  await page_product.save();
    return page_product;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const page_product = await PageProduct.query().where('id', id).firstOrFail();
    await  page_product?.delete();
    return response.status(200).json({ message : "PageProduct supprimer avec succes" });
  }
}
