import { DataPrep } from './providers/dataPrepProvider';
import { INaturalLanguageContract } from './interfaces/INaturalLanguageProvider';
import { LightService } from '../ava-light-service/light-service';

export class AvaAIService {
  private lightService: LightService

  constructor(private brain: INaturalLanguageContract, private socketOptions: any) {
    this.initialise()

    this.lightService = new LightService(socketOptions)
  }

  private initialise = async (): Promise<any> => {
    try {
      await this.setupData()
      await this.brain.feed()
    } catch (err) {
      console.log(err)
    }
  }

  public analyse = async (data: any) => {
    const response = await this.brain.process(data)
    const entity = await this.brain.findEntities(response)

    if (response.utterance.includes('light on') || response.utterance.includes('lights on')) {
      this.lightService.turnLightOn(entity[0].utteranceText)
    } else if (response.utterance.includes('light off') || response.utterance.includes('lights off')) {
      this.lightService.turnLightOff(entity[0].utteranceText)
    }

    this.socketOptions.socket.emit('nlu message', { response: response, entity: entity })
  }

  private setupData = (): Promise<any> => {
    return new DataPrep().setup(this.brain);
  }
}