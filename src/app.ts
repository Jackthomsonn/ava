import * as Express from 'express'
import * as http from 'http'
import * as io from 'socket.io'

import { SocketService } from './socket'

class AvaAIApi {
  private server: http.Server
  private io: SocketIO.Server

  constructor() {
    this.server = new http.Server(Express())

    this.io = io(this.server)

    new SocketService(this.io)

    this.server.listen(8080)
  }
}

export { AvaAIApi }