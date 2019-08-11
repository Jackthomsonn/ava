import { ISocketOptions } from "../interfaces/ISocketOptions";
import { INaturalLanguageContract } from "./interfaces/INaturalLanguageProvider";
import { DataPrep } from "./providers/dataPrepProvider";

export class AvaAIService {
  constructor(private brain: INaturalLanguageContract, private socketOptions: ISocketOptions) {
    this.initialise();
  }

  public analyse = async (data: any) => {
    const response = await this.brain.process(data);
    const entities = await this.brain.findEntities(response);

    this.checkForValidActionEntitities(response, entities);

    this.socketOptions.socket.emit("nlu message", { response, entities });
  }

  private initialise = async () => {
    try {
      await this.setupData();
      await this.brain.feed();
    } catch (err) {
      process.stdout.write(err);
    }
  }

  private checkForValidActionEntitities = (response: any, entities: any) => {
    if (response.intent === "action" && entities.length !== 2) {
      response.answer = "Sorry, that device doesn't seem to exist in your home";
    } else if (response.intent === "action" && entities.length >= 2) {
      this.determineActionToTake(entities);
    }
  }

  private determineActionToTake = (entities: any) => {
    const [location, subject] = [entities[0].entity, entities[1].entity];
  }

  private setupData = () => {
    return new DataPrep().setup(this.brain);
  }
}
