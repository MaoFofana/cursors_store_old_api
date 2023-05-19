import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private booted = false


  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.booted = true
    //AdonisServer.instance!,
    this.io = new Server( AdonisServer.instance!, {
      cors: {
        origin: '*',maxAge : 90
      }
    })
  }
}

export default new Ws()
