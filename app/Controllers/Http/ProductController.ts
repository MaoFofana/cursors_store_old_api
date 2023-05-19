import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import Categorie from "App/Models/Categorie";
import Image from "App/Models/Image";
import Stock from "App/Models/Stock";
import PanierProduct from "App/Models/PanierProduct";
import Magasin from "App/Models/Magasin";
import User from "App/Models/User";
import PageProduct from "App/Models/PageProduct";

export default class ProductController {
  public async index(){
    const products = await Product.query().preload('images').preload('categorie').preload('stocks').preload('magasin');
      return products;  
  }

  public async store({request,response, auth}: HttpContextContract){
    let user = await User.query().where('id', auth.user!.id).firstOrFail();

    let product =  new Product();
    let data = request.all()
    product.name = data.name
    product.sluk = product.name.replace(" ", "_").toLowerCase();
    product.active = data.active
    product.description = data.description
    product.price = data.price
    product.sale_price =  (data.reduction  > 0 || !data.reduction )? data.price -  ((data.price * data.reduction)/100):  data.price; 
    product.reduction = data.reduction ?? 0;
    product.code = data.code;
    product.quantity = data.quantity
    product.weight = data.weight || 0
    product.categorieId = data.categorie_id
    product.seuil = data.seuil
    product.unite = data.unite
    product.magasinId = data.magasin_id;
    product =  await product.save();
    product.userId = user.id;

    if(product.categorieId){
      let categorie = await Categorie.query().where('id', product.categorieId).firstOrFail();
      categorie.related('products').save(product);
    }

    let  magasin = await Magasin.query().where('id', product.magasinId).firstOrFail();
    magasin.related('products').save(product);

    let stock = new Stock();
    stock.quantity_entree = product.quantity;
    stock.productId = product.id;
    stock.userId = user.id;
    stock.quantity = product.quantity;
    stock =  await stock.save();
    product.related('stocks').save(stock);
    user.related('stocks').save(stock);
    user.related('products').save(product);

    let pageProduct = new PageProduct();
    pageProduct.userId = user.id;
    pageProduct.productId = product.id;
    await pageProduct.save();
    response.status(200).json({ message : "product enregistrer avec success", id : product.id   });
  }





  public async show({params}: HttpContextContract){
    const id = params.id;
    return await Product.query().where('id', id).preload('images').preload('categorie').preload('magasin').firstOrFail();
  }


  public async search({params} : HttpContextContract) {
    let word : string = params.word
    word = word.replace("%20", " ")
    let productReturn : Product[] = []
    const products = await Product.query().where('quantity', '>', 0).where('name', 'LIKE', word+'%').preload('images').preload('categorie').preload('magasin').limit(8);
   if(products) productReturn = products;

    if(productReturn)return  productReturn;//.filter(item=> item.stock_quantity > 0);
    else  return  []
  }
  
  public async searchPoposition({params} : HttpContextContract) {
    let word : string = params.word
    word = word.replace("%20", " ")
    const products = await Product.query().where('name', 'LIKE', '%'+word+'%')
    //const categories = await  Categorie.query().where('name', 'LIKE', '%'+word+'%')
    let names : string[] = []
    products.forEach(product=> {
      if(names.length < 11) names.push(product.name)
    })
    /*categories.forEach(categorie=> {
      if(names.length < 11) names.push(categorie.name)
    })*/
    return names;
  }


  public async recent(){
    const products =  await Product.query().preload('images').preload('categorie').limit(4)
    return products;
  }


  public async getByCategorie({params} : HttpContextContract){
    const idCategorie = params.id
    let products  = await Product.query().where("categorie_id", idCategorie)
                        .preload('images').preload('categorie').preload('magasin');
   
    return products;
  }

  
  public async getByMagasin({params} : HttpContextContract){
    const idMagasin = params.id
    let products  = await Product.query().where("magasin_id", idMagasin)
                        .preload('images').preload('categorie').preload('magasin');
    return products;
  }

  public async getByEntrepriseName({params} : HttpContextContract){
    let entrepriseName   : string =  params.entreprise;
    let productName  : string = params.product;
    
    let user = await User.query().where('code_link', entrepriseName).firstOrFail();
    let products  = await Product.query().where("sluk",productName).andWhere('user_id', user.id)
                        .preload('images').preload('categorie').preload('magasin').preload('user').firstOrFail();
                        console.log(JSON.stringify(products));
    return products;
  }


  public async getByMagasinAndCategorie({params} : HttpContextContract){
    const idMagasin = params.id_magasin
    const idCategorie = params.id_categorie;
    let products  = await Product.query().where("magasin_id", idMagasin).where("categorie_id", idCategorie)
                        .preload('images').preload('categorie').preload('magasin');
   
    
    return products;
  }

  public async update({request, params}: HttpContextContract){
    const product = await Product.query().where('id', params.id).firstOrFail();
    let data = request.all()
    product.name = data.name
    product.active = data.active
    product.description = data.description
    product.price = data.price
    product.sale_price = (data.reduction  > 0 || !data.reduction )? data.price -  ((data.price * data.reduction)/100):  data.price; 
    product.reduction =  data.reduction ?? 0;
    product.quantity = data.quantity
    product.weight = data.weight || 0
    product.seuil = data.seuil
    product.unite = data.unite
    product.categorieId = data.categorie_id
    product.magasinId = data.magasin_id;
    await product!.save();
    if(product.categorieId){
      let categorie = await Categorie.query().where('id', product.categorieId).firstOrFail();
      categorie.related('products').save(product);
    }
    if(data.magasin_id){
       let  magasin = await Magasin.query().where('id', product.magasinId).firstOrFail();
       magasin.related('products').save(product);
    }
    
  
    const returnValue = await Product.query().where('id', params.id).preload('categorie').preload('images').firstOrFail();
    return returnValue;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    await Image.query().where('product_id', id).delete();
    await Stock.query().where('product_id', id).delete();
    await PanierProduct.query().where('product_id', id).delete();
    await PageProduct.query().where('product_id', id).delete();
    const product = await Product.query().where('id', id).firstOrFail();
    await  product?.delete();
    return response.status(200).json({ message : "Product supprimer avec succes" });
  }
}
