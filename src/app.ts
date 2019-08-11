import * as Express from "express";
import * as http from "http";
import * as io from "socket.io";
import { SocketService } from "./socket";

export class AvaAIApi {
  private server: http.Server;
  private io: SocketIO.Server;
  private app: Express.Application;

  constructor() {
    this.app = Express();
    this.server = new http.Server(this.app);

    this.io = io(this.server);

    const socketService = new SocketService(this.io);

    this.app.get("/", (req, res) => {
      res.status(200).send({
        creator: "Jack Thomson",
        description: "Ava AI Assistant",
        status: "healthy",
        version: require("../package.json").version,
      });
    });

    this.server.listen(8080);
  }
}
