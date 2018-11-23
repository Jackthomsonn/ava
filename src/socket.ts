import { LightService } from "../modules/ava-light-service/light-service";
import { AvaAIService } from "../modules/ava-ai/ava-ai";
import { NodeNLPManagerImplementation } from "../modules/ava-ai/implementations/nodeNLPManagerImplementation";

export class SocketService {
  private lightService: LightService
  private avaAIService: AvaAIService

  constructor(private io: SocketIO.Server) {
    io.on('connection', (socket: SocketIO.Socket) => {
      const socketOptions = { io, socket }

      this.lightService = new LightService(socketOptions)
      this.avaAIService = new AvaAIService(new NodeNLPManagerImplementation({ language: 'en' }), socketOptions)

      socket.on('lights: get all lights', this.lightService.getAllLights)
      socket.on('lights: turn light on', this.lightService.turnLightOn)
      socket.on('lights: turn all lights on', this.lightService.turnAllLightsOn)
      socket.on('lights: turn light off', this.lightService.turnLightOff)
      socket.on('lights: turn all lights off', this.lightService.turnAllLightOff)

      socket.on('ava: analyse', this.avaAIService.analyse)
    })
  }
}