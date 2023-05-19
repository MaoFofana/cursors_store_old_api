import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Categorie from "App/Models/Categorie";
import Product from "App/Models/Product";
import User from "App/Models/User";


export default class CategorieController {
  public async index({auth}: HttpContextContract) {
    const categories = await Categorie.query().where('user_id', auth.user?.id!).preload('categories');
    return categories ? categories : [];
  }

  public async store({request, response, auth}: HttpContextContract) {
    let categorie = new Categorie();
    let data = request.all()
    categorie.name = data.name
    categorie.description = data.description || ''
    categorie.image = data.image
    categorie.userId = auth.user?.id!;
    if(data.categorie_id)categorie.categorieId = data.categorie_id;
    categorie = await categorie.save();
    if (categorie.categorieId) {
      var categorieMere = await Categorie.findOrFail(data.categorie_id)
      categorieMere.related('categories').save(categorie);
    }
    let user = await User.query().where('id', auth.user!.id!).firstOrFail();
    user.related('categories').save(categorie);
    response.status(200).json(categorie);
  }

  public async show({params}: HttpContextContract) {
    const id = params.id;
    const categorie = await Categorie.query().where('id', id).preload('categories').first();
    
    return categorie;
  }

  public async update({request, params, response}: HttpContextContract) {
    let categorie = await Categorie.findOrFail(params.id);
    let data = request.all()
    categorie.name = data.name
    categorie = await categorie.save();
    return response.status(200).json(categorie);
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id;
    var products = await Product.query().where('categorie_id', id); 
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      element.related('categorie').dissociate();
    }
    var categorie = await Categorie.query().where('id',id).firstOrFail();
    categorie.related('categorie').dissociate();
    categorie.delete();
    return response.status(200).json({message: "Categorie supprimer avec succes"});
  }

}

