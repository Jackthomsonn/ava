import { AvaAIService } from "../modules/ava-ai/ava-ai";
import { NodeNLPManagerImplementation } from "../modules/ava-ai/implementations/nodeNLPManagerImplementation";
import { ISocketOptions } from "../modules/interfaces/ISocketOptions";
import { PowerService } from "./../modules/ava-power-service/power-service";

export class SocketService {
  private powerService: PowerService;
  private avaAIService: AvaAIService;

  constructor(private io: SocketIO.Server) {
    io.on("connection", (socket: SocketIO.Socket) => {
      const socketOptions: ISocketOptions = { io, socket };

      this.powerService = new PowerService(socketOptions);
      this.avaAIService = new AvaAIService(
        new NodeNLPManagerImplementation({
          languages: "en",
        }), socketOptions,
      );

      this.setupSocketEvents(socket);
    });
  }

  private setupSocketEvents = (socket: SocketIO.Socket) => {
    // socket.on("lights: get all lights", this.powerService);

    socket.on("ava: analyse", this.avaAIService.analyse);
  }
}
