import { ServiceBase } from "../serviceBase"
import { ISocketOptions } from "../interfaces/ISocketOptions";

export class LightService {
  constructor(private socketOptions: ISocketOptions) { }

  public getAllLights = () => { }

  public turnLightOn = (data) => {
    console.log('Turned on')
    this.socketOptions.socket.emit('light turned on', { lightName: `The ${data.subject} was turned on in ${data.location}` })
  }

  public turnAllLightsOn = (data) => { }

  public turnLightOff = (data) => {
    this.socketOptions.socket.emit('light turned off', { lightName: `The ${data} was turned off` })
  }

  public turnAllLightOff = (data) => { }
}