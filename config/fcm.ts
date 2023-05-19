import { FCMConfig } from '@ioc:Adonis/Addons/FCM'

const fcmConfig: FCMConfig = {
  /*
  |--------------------------------------------------------------------------
  | API KEY
  |--------------------------------------------------------------------------
  |
  | The key api Firebase Cloud Messaging
  |
  */
  apiKey: 'AAAAUgbRO5A:APA91bGxktBL8WboIZbENKiYxvaJGAUvn2Ae4e48VdP0CVmYO5EX-JM6zY8NTK9KKKRAHZIHQENdxoRM8XhNArIptPTbhdpxkt4nH7flNeEH2rFq11GQGO0iUkjcsCVc-PC0HajhZaGp',

  requestOptions: {
    // proxy: 'http://127.0.0.1',
    // timeout: 5000
  }
}
export default fcmConfig
