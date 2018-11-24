import * as Express from 'express'
import * as http from 'http'
import * as io from 'socket.io'

import { SocketService } from './socket'

class AvaAIApi {
  private server: http.Server
  private io: SocketIO.Server
  private app: Express.Application

  constructor() {
    this.app = Express()
    this.server = new http.Server(this.app)

    this.io = io(this.server)

    new SocketService(this.io)

    this.app.get('/', (_req, res) => {
      res.status(200).send({
        status: "healthy",
        description: "Ava AI Assistant",
        version: require('../package.json').version,
        creator: "Jack Thomson"
      })
    })

    this.server.listen(8080)
  }
}

export { AvaAIApi }