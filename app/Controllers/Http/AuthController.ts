import User from 'App/Models/User'
import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from "App/Services/Ws";
import Mail from '@ioc:Adonis/Addons/Mail';
import crypto from "crypto";
import Notification from 'App/Models/Notification';
import Magasin from 'App/Models/Magasin';
import { authLink, authTilte, sendEmail } from 'App/Services/constante';

export default class AuthController {


  public async register ({ request,response }: HttpContextContract) {
    const data = request.all()
    /**
     * Validate user details
     */
    var phoneD = await User.query().where('phone', data.phone).first();
    var email = await User.query().where('email', data.email).first();
    if(phoneD){
      return response.status(409).send("Le numéro existe déjà");
    }else if(email){
      return response.status(409).send("L'email existe déjà");
    }else {
      try {
        let user = new User()
        user.email = data.email
        user.password = crypto.createHash('md5').update(data.password).digest("hex");
        user.email = data.email
        user.role = data.role;
        user.adresse = data.adresse;
        user.avatarUrl = data.avatar_url;
        user.active = true;
        user.name = data.name;
        user.code_link = user.name.trim().replace(" ", "_").toLowerCase();
        user.phone = data.phone
        const uuid = require('uuid');
        var code  = uuid.v1() + "-cursors-design-" + uuid.v4();
        user.code = code;
        var magasin = new Magasin();
        magasin.name = "PRINCIPAL";
        magasin.principale = true;
        user = await user.save();
        magasin = await magasin.save();
        await user.related('magasin_gerer').save(magasin);
  
  
        if(data.role === "ADMIN" || data.role === "SUPER_ADMIN"){
          user.active = true
          await  user.save();
        }else {       
          const adminNotif = new Notification()
          adminNotif.message = "Nouveau utilisateur enregistré"
          adminNotif.lu = false
          await adminNotif.save();
          Ws.io.emit('new:user', adminNotif)
          const uuid = require('uuid');
          var code  = uuid.v1() + "-cursors-" + uuid.v4();
          user.code = code;
          user.active = false;
          await  user.save();
          await Mail.sendLater((message) => {
            message
              .from(sendEmail)
              .to(user.email)
              .subject(authTilte)
              .htmlView('emails/welcome', { name: user.name,code:authLink +code })
          })
        }
        /*
        * Connect  you user and return token and user
        */
        return response.status(200).json({
          status : "VALIDE"
        })
      } catch (error) {
        console.log(error);
        return response.status(409).send("Une erreur est intervenu");
      
      }
    
    }
   
    
  }

  public async validateCompte ({ params, response }: HttpContextContract) {
    var users = await User.query().where('code', params.code);
    if(users.length == 0 || users == null){
      response.redirect().toPath("https://cursorsdesign.com/validate_error");
    }else {
        var user = users[0];
        user.active = true;
        //@ts-ignore
        user.code = null;
        await user.save();
        response.redirect().toPath("https://cursorsdesign.com/validate")
    }
  }



  public async changePassword({response,request}:HttpContextContract) {
      var data = request.all();
      var user = await User.query().where('code', data.code).firstOrFail();
      user.password = data.password;
      //@ts-ignore
      user.code = null;
      await user.save();
      return response.status(200).json('Mot de passe modifier avec succès')
  }
  public async login ({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    let password = request.input('password')
    console.log(password);
    /*
    * Connect user
    * */
    try {
  // Lookup user manually
  const user = await User
    .query()
    .where('email', email)
    .first()
    if(!user){
      return response.status(409).json({"errors" :"not-found" });
    }
  // Verify password
  password = crypto.createHash('md5').update(password).digest("hex");
  if (user!.password !=  password) {
   return  response.status(409).json({"errors" :"password" });
    //return response.badRequest('Invalid credentials')
  }

  // Generate token
  const token = await auth.use('api').generate(user!)

  if(user!.active){

    user.active = true;
    return response.status(200).json({
      token : token,
      user : user,
      message : "VALIDE"
    })
  }else{
    return  response.status(200).json({message : "E_NOT_ACTIVE"})
  }

    } catch (error) {
    
      if (error.code === 'E_INVALID_AUTH_UID') {
        // unable to find user using email address
        response.status(401).json({ message: 'E_INVALID_AUTH_UID'})
      }
      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        // password mis-match
        response.status(401).json({ message: 'E_INVALID_AUTH_PASSWORD'})
      }
    }
  }

  public async logout ({auth} : HttpContextContract) {
    await auth.use('api').logout()
  }
}


