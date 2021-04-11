import { ISocketOptions } from "./interfaces/ISocketOptions";
import { INaturalLanguageContract } from "./interfaces/INaturalLanguageProvider";
import { DataPrep } from "./data";
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFileSync } from 'fs';
import { join } from "path";

export class AvaAIService {
  constructor(private brain: INaturalLanguageContract, private socketOptions: ISocketOptions) {
    this.initialise();
  }

  public analyse = async (data: any) => {
    const response = await this.brain.process(data);
    const entities = await this.brain.findEntities(response);

    this.checkForValidActionEntitities(response, entities);

    const client = new TextToSpeechClient();

    if (!response.answer) {
      response.answer = 'I could not generate a response for that Jack';
    }

    const [ content ] = await client.synthesizeSpeech({
      input: { text: response.answer },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'LINEAR16' },
    });

    writeFileSync(join(__dirname, '..', '..', 'public', 'audio.mp3'), content.audioContent, { encoding: 'binary', flag: 'w' });

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
    const [ location, subject ] = [ entities[ 0 ].entity, entities[ 1 ].entity ];

    // We new up a module here depending on the subject and use the location to understand where in the house the device is
  }

  private setupData = () => {
    return new DataPrep().setup(this.brain);
  }
}
