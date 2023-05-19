import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PanierProduct from 'App/Models/PanierProduct';
import Product from 'App/Models/Product';
import User from 'App/Models/User';

export default class PanierProductsController {


    public async store({request,response, auth}: HttpContextContract){
        const data = request.all()
        let userAuth = auth.use("api").user;
        
        const panierProduct : PanierProduct = new PanierProduct();
        panierProduct.quantite = data.quantite
        panierProduct.price = data.price
        await panierProduct.save()
        const product = await Product.query().where('id', data.product.id).first()
        await panierProduct.related('product').associate(product!)
        let user = await User.query().where('id', userAuth!.id).firstOrFail();
        await panierProduct.related('user').associate(user);
        response.status(200).json({ message : "Panier enregistrer avec success"   });
      }
    
    public async changeQuantite({params,auth,response}: HttpContextContract){
        const quantite = params.quantite;
        const product_id = params.product_id;
        let userAuth = auth.use("api").user;
        let panierProduct  = await PanierProduct.query() //@ts-ignore
            .where('product_id', product_id).where('user_id',userAuth!.id).where('order_id', null).first()

        if(panierProduct == null){
         const product = await Product.query().where('id', product_id).firstOrFail();
         const panierProduct : PanierProduct = new PanierProduct();
         panierProduct.quantite = quantite;
         panierProduct.price = product.sale_price
         await panierProduct.save()
         await panierProduct.related('product').associate(product!)
         let user = await User.query().where('id', userAuth!.id).firstOrFail();
         await panierProduct.related('user').associate(user);
        }else {
          panierProduct.quantite = quantite;
          await panierProduct.save();
        }
          
        return response.status(200);
      }
      public async destroy({params, response}: HttpContextContract){
        const id = params.id;
        const item = await PanierProduct.findOrFail(id);
        await  item?.delete();
        return response.status(200).json({ message : "Produit supprimer avec succes" });
      }
}
