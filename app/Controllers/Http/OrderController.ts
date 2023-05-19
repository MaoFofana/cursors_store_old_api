import FCM from "@ioc:Adonis/Addons/FCM";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";
import PanierProduct from "App/Models/PanierProduct";
import Product from "App/Models/Product";
import Stock from "App/Models/Stock";
import User from "App/Models/User";
import Ws from "App/Services/Ws";

export default class OrderController {
  public async index({auth} : HttpContextContract){
    return await Order.query().where("user_id", auth.user?.id + '').preload('panier_products', (query)=>{
      query.preload('product')
    }).preload('user');
  }


  public async indexMe({auth} : HttpContextContract){
    return await Order.query().where("user_id", auth.user?.id + '').preload('panier_products', (query)=>{
      query.preload('product')
    }).preload('user');
  }


  public async getProductPanier({params} : HttpContextContract){
    const id = params.id;
    var items = await  PanierProduct.query().where('order_id',id).preload('product');
    return items;
  }

  public async store({request,response, auth}: HttpContextContract){
    const userAuth = auth.user
    const data = request.all()
    const user = await User.query().where('id',  userAuth!.id).firstOrFail()
    let order =  new Order();
   
    order.client_name = data.client_name;
    order.client_number = data.client_number;
    order.status = data.status;
    order.discount_total = data.discount_total
    order.shipping_total = data.shipping_total
    order.total = data.total
    order.avance = data.avance;
    order.lieu = data.lieu;
    var firebasesKey : string[] = [];
    firebasesKey.push(user.firebase);
    var orderCount = (await Order.query().where('user_id', user.id)).length;
    order.number = "CMD-" + (orderCount + 1)
    order.userId = auth.user?.id!;
    order = await order.save();
    console.log(data.panier_products.length);
   if(data.panier_products) {
      for (let i = 0; i < data.panier_products.length ; i++) {
        let panierProductData : PanierProduct = data.panier_products[i];      
        let panierProduct = new PanierProduct();

        panierProduct.quantite = panierProductData.quantite
        panierProduct.price =panierProductData.price
        panierProduct.productId = data.panier_products[i].product_id;
        panierProduct.name  = panierProductData.name
        panierProduct.image = panierProductData.image;

        panierProduct.orderId = order.id;
        panierProduct = await panierProduct.save()

        const product = await Product.query().where('id', panierProduct.productId).firstOrFail()
        await panierProduct.related('product').associate(product)
        await panierProduct.related('order').associate(order)
      }
    }
    await FCM.send({ notification: {title : "Nouvelle commande", body: "Vous avez une nouvelle commande" }},firebasesKey);
    Ws.io.emit('new:order', { order : order})
    response.status(200).json({ message : "Commande enregistrer avec success"   });
  }

  public async clientSave({request,response}: HttpContextContract){
  
    const data = request.all()
    const user = await User.query().where('id',  data.user_id).firstOrFail()
    let order =  new Order();
   
    order.client_name = data.client_name;
    order.client_number = data.client_number;
    order.status = data.status;
    order.discount_total = data.discount_total
    order.shipping_total = data.shipping_total
    order.total = data.total
    order.avance = data.avance;
    order.lieu = data.lieu;
    var firebasesKey : string[] = [];
    if(user.firebase.length > 0){
      firebasesKey.push(user.firebase);
    }
   
    var orderCount = (await Order.query().where('user_id', user.id)).length;
    order.number = "CMD-" + (orderCount + 1)
    order.userId =data.user_id!;
    order = await order.save();
   if(data.panier_products) {
      for (let i = 0; i < data.panier_products.length ; i++) {
        let panierProductData : PanierProduct = data.panier_products[i];      
        let panierProduct = new PanierProduct();

        panierProduct.quantite = panierProductData.quantite
        panierProduct.price =panierProductData.price
        panierProduct.productId = data.panier_products[i].product_id;
        panierProduct.name  = panierProductData.name
        panierProduct.image = panierProductData.image;

        panierProduct.orderId = order.id;
        panierProduct = await panierProduct.save()

        const product = await Product.query().where('id', panierProduct.productId).firstOrFail()
        await panierProduct.related('product').associate(product)
        await panierProduct.related('order').associate(order)
      }
    }
    if(firebasesKey.length > 0 ){
      await FCM.send({ notification: {title : "Nouvelle commande", body: "Vous avez une nouvelle commande" }},firebasesKey);

    }
    Ws.io.emit('new:order', { order : order})
    response.status(200).json({ message : "Commande enregistrer avec success"   });
  }


  public async show({params}: HttpContextContract){
    const id = params.id;
    const order = await Order.query().where('id', id).preload('panier_products').firstOrFail();
    return order;
  }

  
  public async byDeliverer({params}: HttpContextContract){
    const id = params.id;
    const order = await Order.query().where('livreur_id', id).preload('panier_products', (queryPanier) =>{
      queryPanier.preload('product', (queryProduct)=>{
        queryProduct.preload('images').preload('categorie')
      })
    } ).firstOrFail();
    return order;
  }


  public async showPanier({params}: HttpContextContract){
    const id = params.id;
    const panier_products = await PanierProduct.query().where('order_id', id).preload('product');
    return  panier_products;
  }

  public async update({request, params}: HttpContextContract){
    const order = await Order.query().where('id', params.id).preload('panier_products').firstOrFail();
    const status = order.status;
    const data = request.all()
 
    order.status = data.status
    order.livreur_id = data.livreur_id
    await order.save();

    if(data.status == "LIVREE"){
      for (let i = 0; i < order.panier_products.length ; i++) {
        let panierProductData : PanierProduct = order.panier_products[i];      
        let panierProduct =await PanierProduct.query().where('id', panierProductData.id).firstOrFail();
        // new PanierProduct();

        panierProduct.quantite = panierProductData.quantite
        panierProduct.price = panierProductData.price
        panierProduct.productId = order.panier_products[i].productId;
        panierProduct.name  = panierProductData.name
        panierProduct.image = panierProductData.image;

        panierProduct.orderId = order.id;
        panierProduct = await panierProduct.save()

        const product = await Product.query().where('id', panierProduct.productId).firstOrFail()
        await panierProduct.related('product').associate(product)
      
        product.quantity -= panierProduct.quantite;
        await product.save();

        let stocka =  new Stock();
        stocka.quantity_sortie = panierProduct.quantite;
        stocka.productId = product.id;
        stocka.quantity = product.quantity;
        stocka.userId =  product.userId;
        stocka.prix = panierProduct.price;
        stocka.related("product").associate(product);
        await stocka.save();
    
        await panierProduct.related('order').associate(order)
      }
    }
    /*
    if(data.livreur_id){
      var livreur = await User.find(data.livreur_id);
      order.related('livreur').associate(livreur!);
    }*/
    if(status != data.status){
      Ws.io.emit('change:order', "L'etat de votre commande à changer")
    }
    return order;
  }
 

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const order = await Order.findOrFail(id);
    await  order?.delete();
    return response.status(200).json({ message : "Order supprimer avec succes" });
  }
}
