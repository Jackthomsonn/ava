import { NerManager, NlpManager } from "node-nlp";
import { INaturalLanguageContract } from "../interfaces/INaturalLanguageProvider";

export class NodeNLPManagerImplementation implements INaturalLanguageContract {
  private agent: any;
  private entityAgent: any;

  constructor(options: any) {
    this.agent = new NlpManager(options);
    this.entityAgent = new NerManager({ threshhold: 1.0 });
  }

  public process = (options: any) => {
    return this.agent.process(options.language, options.message);
  }

  public populateData = (options: any) => {
    this.agent.addDocument(options.language, options.utterance, options.classifier);
  }

  public populateAnswers = (options: any) => {
    this.agent.addAnswer(options.language, options.classifier, options.answer);
  }

  public populateEntities = (entityOne, entityTwo, entityThree, entityFour) => {
    this.entityAgent.addNamedEntityText(entityOne, entityTwo, entityThree, entityFour);
  }

  public findEntities = (message: any) => {
    return this.entityAgent.findEntities(
      message.utterance,
      "en",
    );
  }

  public feed = () => {
    return this.agent.train();
  }
}
