export class LightService {
  constructor(private socketOptions: any) { }

  public getAllLights = () => { }

  public turnLightOn = (data) => {
    this.socketOptions.socket.emit('light turned on', { lightName: `The ${data} was turned on` })
  }

  public turnAllLightsOn = (data) => { }

  public turnLightOff = (data) => {
    this.socketOptions.socket.emit('light turned off', { lightName: `The ${data} was turned off` })
  }

  public turnAllLightOff = (data) => { }
}