import { LightService } from "../modules/ava-light-service/light-service"
import { AvaAIService } from "../modules/ava-ai/ava-ai"
import { NodeNLPManagerImplementation } from "../modules/ava-ai/implementations/nodeNLPManagerImplementation"
import { ISocketOptions } from "../modules/interfaces/ISocketOptions";

export class SocketService {
  private lightService: LightService
  private avaAIService: AvaAIService

  constructor(private io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
      const socketOptions: ISocketOptions = { io, socket }

      this.lightService = new LightService(socketOptions)
      this.avaAIService = new AvaAIService(new NodeNLPManagerImplementation({ languages: 'en' }), socketOptions)

      this.setupSocketEvents(socket)
    })
  }

  private setupSocketEvents = (socket: SocketIO.Socket) => {
    socket.on('lights: get all lights', this.lightService.getAllLights)
    socket.on('lights: turn light on', this.lightService.turnLightOn)
    socket.on('lights: turn all lights on', this.lightService.turnAllLightsOn)
    socket.on('lights: turn light off', this.lightService.turnLightOff)
    socket.on('lights: turn all lights off', this.lightService.turnAllLightOff)

    socket.on('ava: analyse', this.avaAIService.analyse)
  }
}