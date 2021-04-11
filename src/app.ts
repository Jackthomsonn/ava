import * as Express from "express";
import * as http from "http";
import * as io from "socket.io";
import { SocketService } from "./socket";
import { join } from 'path';

export class AvaAI {
  private server: http.Server;
  private io: SocketIO.Server;
  private app: Express.Application;

  constructor() {
    this.app = Express();
    this.app.use(Express.static(join(__dirname, '..', 'public')));
    this.server = new http.Server(this.app);
    this.setupSocketServer();
    this.setupRoutes();
    this.server.listen(8080);
  }

  setupRoutes() {
    this.app.get('/app', (req, res) => {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    });

    this.app.get("/", (_req, res) => {
      res.status(200).send({
        creator: "Jack Thomson",
        description: "Ava AI Assistant",
        status: "healthy",
        version: require("../package.json").version,
      });
    });
  }

  setupSocketServer() {
    this.io = io(this.server);

    new SocketService(this.io);
  }
}
