import { AvaAIService } from "../core/index";
import { NodeNLPManagerImplementation } from "../core/implementations/nodeNLPManagerImplementation";
import { ISocketOptions } from "../core/interfaces/ISocketOptions";

export class SocketService {
  private avaAIService: AvaAIService;

  constructor(io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
      const socketOptions: ISocketOptions = { io, socket };

      this.avaAIService = new AvaAIService(new NodeNLPManagerImplementation({ languages: 'en' }), socketOptions);

      this.analyseUtterance(socket);
    });
  }

  private analyseUtterance = (socket: SocketIO.Socket) => {
    socket.on('ava: analyse', this.avaAIService.analyse);
  }
}
