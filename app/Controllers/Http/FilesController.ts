 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Application from "@ioc:Adonis/Core/Application";
import { url } from 'App/Services/url';
import fs from "fs";
export default class FilesController {

  public async uploadFileByBase64({request, response} : HttpContextContract) {
      let data = request.all()
      const base64Data = data.image;
      var  extention : string = "png";
      const newFileName =  (new Date().getTime()+ "." +extention)
      fs.writeFile( Application.tmpPath('uploads') + "/" + newFileName, base64Data, 'base64', function(err) {
        console.log(err);
      });
  
  return response.status(200).json({name: url +  newFileName})
}

  public async uploadFile({request, response} : HttpContextContract) {
      const file = request.file('file');

      if(!file){
        response.status(500).json({message: 'Probleme'})
      }
      var  extention : string = file!.extname!;
      const newFileName = new Date().getTime()+ "." +extention
      await file!.move(Application.tmpPath('uploads'), {
        name : newFileName
      })
    return response.status(200).json({name: url +  newFileName})
  }

  public async uploadMultipleFile({request, response} : HttpContextContract) {
    const files = request.files('files');
    let newFiles :string[] =  []
    if(!files){
      response.status(500).json({message: 'Probleme'})
    }
    files.map(async (file)=> {
      const newFileName = new Date().getTime()+ "." +file!.extname
      await file!.move(Application.tmpPath('uploads'), {
        name: newFileName,
      });
      newFiles.push(url + newFileName)
    })

    return response.status(200).json({names : newFiles})
  }

  public async downloadFile({params, response}: HttpContextContract) {
    response.download(Application.tmpPath("/uploads/" + params.name));
  }

}
