import { DataPrep } from './providers/dataPrepProvider';
import { INaturalLanguageContract } from './interfaces/INaturalLanguageProvider';

export class AvaAIService {
  constructor(private brain: INaturalLanguageContract, private socketOptions: any) {
    this.initialise()
  }

  private initialise = async (): Promise<any> => {
    try {
      await this.setupData()
      await this.brain.feed()
    } catch (err) {
      console.log(err)
    }
  }

  public analyse = (data: any) => {
    return this.brain.process(data)
  }

  private setupData = (): Promise<any> => {
    return new DataPrep().setup(this.brain);
  }
}