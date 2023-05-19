import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Logger from '@ioc:Adonis/Core/Logger';
import crypto from "crypto";
import Magasin from "App/Models/Magasin";
import Mail from "@ioc:Adonis/Addons/Mail";

export default class UsersController {

  public async getMe({ auth }: HttpContextContract){
    let userAuth = auth.use("api").user;
    let user = await User.query().where('id', userAuth!.id).first();
    return user;
  }

  public async index(){
    return User.query().where('role', "USER");
  }



  public async updatePassword({request,auth, response}){
    const data = request.all()
    const user = await auth.use("api").user;
    var passaword = crypto.createHash('md5').update(data.old_password).digest("hex");
    const new_password =  crypto.createHash('md5').update(data.new_password).digest("hex");
    const isPassword = new_password == passaword ? true : false;
    // await Hash.verify(user.password, data.old_password)
    if(isPassword){
      user.password = new_password;
      user.save();
      return response.status(200).json(user);
    }else {
      return response.status(500).json({error: "Votre mot de passe est invalide"})
    }
  }

  public async affecterMagasin({request,response}: HttpContextContract){
    let  data = request.all();
    let user = await User.query().where('phone', data.phone).first();
    let userPatron = await User.query().where('id', data.patron_id).firstOrFail();
    if(user == null){
      user = new User();
      user!.role = "USER";
      user!.phone = data.phone;
      user!.active = true;
      user!.name = userPatron!.name;
      user!.email = userPatron!.email;
      user!.avatarUrl = userPatron!.avatarUrl;
      user!.adresse = userPatron!.adresse;
    }    
    user.patron_id = data.patron_id;
    user = await user.save();
    user.related('patron').associate(userPatron);
    let magasin = await Magasin.query().where('id', data.magasin_id).firstOrFail();
    await user.related('magasin_gerer').save(magasin);
    response.status(200).json(user);
  }

  public async userByEntreprise({response,params}: HttpContextContract){
    let  id_patron = params.id;
    let users = await User.query().where('patron_id', id_patron);
    console.log(users);
    response.status(200).json(users);
  }

  public async store({request,response}: HttpContextContract){
    let  data = request.all();

    let userVerify = await User.findBy("phone", data.phone);
    if(userVerify){
      response.status(200).send({user:userVerify, message : "VALIDE"});
    }else {
      let user = new User();
      user.email = data.email
      user.password = crypto.createHash('md5').update('0123456789').digest("hex");
      user.name = data.name;
      user.role = data.role;
      user.adresse = data.adresse;
      user.avatarUrl = data.avatar_url;
      user.active = true;
      user.phone = data.phone
      const uuid = require('uuid');
      var code  = uuid.v1() + "-king-market-" + uuid.v4();
      user.code = code;
      user = await user.save();
      let message = ""
      if(data.role === "ADMIN"){
        message = "Nouvel admin enregistré avec success"
      }


      if(data.role === "USER"){
        message = "Nouveau client enregistré avec success"
      }
      Logger.info(message)
      response.status(200).send({user:user, message : "VALIDE"});
    }
  }

  public async show({params}: HttpContextContract){
    const id = params.id;
    var user =  await User.query().where('id', id).firstOrFail();
    return user;
  }

  public async  getUser({params} : HttpContextContract) {
    const role = params.role
    return  User.query().where('role', role);
  }

  public async searchUser({params} : HttpContextContract) {
    const word = params.word
    return User.query().where('firstName', 'LIKE', '%' + word + '%');
  }

  
  public async sendNewPasswordByEmail({params, response}: HttpContextContract){
    const email = params.email;
   
    var user =  await User.query().where('email', email).firstOrFail();
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$&@';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }


    var specialResultat         = '';
    var specialCaracteres       = '';
    var specialCharactersLength = specialCaracteres.length;
    for ( var i = 0; i < 1; i++ ) {
      specialResultat += specialCaracteres.charAt(Math.floor(Math.random() * specialCharactersLength));
    }

    const passaword =result + specialResultat;

    user.password = crypto.createHash('md5').update(passaword).digest("hex");
    await Mail.send((message) => {
      message
        .from("info@cursorsdesign.com")
        .to(user.email)
        .subject("Mot de passe oublié | CURSORS DESIGN")
        .htmlView('emails/update_password.edge', {code:passaword })
    })
    await user.save();
    return response.status(200).send("Un nouveau mot de passe vient d'etre envoyer à " + email);
  }

  public async update({params, request}: HttpContextContract){
    const id = params.id;
    let data = request.all();
    const user = await User.findOrFail(id);
    user.email = data.email
   // user.password = crypto.createHash('md5').update('0123456789').digest("hex");
    user.name = data.name;
    user.role = data.role;
    user.adresse = data.adresse;
    user.avatarUrl = data.avatar_url;
    user.active = true;
    user.phone = data.phone
    user.firebase = data.firebase;
    await user.save();
    let message = ""
    if(data.role === "ADMIN"){
      message = "Nouvel admin modifier avec success"
    }

    if(data.role === "USER"){
      message = "Client modifier avec success"
    }
    Logger.info(message)
    return user;
  }

  public async destroy({params, response}: HttpContextContract){
    const id = params.id;
    const user = await User.find(id);
    await  user?.delete();
    return response.status(200).json({message: "Item delete"});
  }
}
