import { INaturalLanguageContract } from '../interfaces/INaturalLanguageProvider';
import { NlpManager } from 'node-nlp';

export class NodeNLPManagerImplementation implements INaturalLanguageContract {
  private agent;

  constructor(options: any) {
    this.agent = new NlpManager(options)
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

  public feed = () => {
    return this.agent.train()
  }
}