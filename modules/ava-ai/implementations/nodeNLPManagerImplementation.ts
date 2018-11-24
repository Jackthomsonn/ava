import { INaturalLanguageContract } from '../interfaces/INaturalLanguageProvider';
import { NlpManager, NerManager } from 'node-nlp';

export class NodeNLPManagerImplementation implements INaturalLanguageContract {
  private agent;
  private entityAgent;

  constructor(options: any) {
    this.agent = new NlpManager(options)
    this.entityAgent = new NerManager({ threshhold: 0.8 })
  }

  public process = (options: any) => {
    return this.agent.process(options.language, options.message)
  }

  public populateData = (options: any) => {
    this.agent.addDocument(options.language, options.greeting, options.classifier)
  }

  public populateAnswers = (options: any) => {
    this.agent.addAnswer(options.language, options.classifier, options.answer)
  }

  public populateEntities = (entityOne, entityTwo, entityThree, entityFour) => {
    this.entityAgent.addNamedEntityText(entityOne, entityTwo, entityThree, entityFour)
  }

  public findEntities = (message: any) => {
    return this.entityAgent.findEntities(
      message.utterance,
      'en'
    )
  }

  public feed = () => {
    return this.agent.train()
  }
}