export interface INaturalLanguageContract {
  process(options: any): Promise<any>;

  populateData(options: any): void;

  populateAnswers(options: any): void;

  feed(): Promise<any>;

  populateEntities(entityOne, entityTwo, entityThree, entityFour): any;

  findEntities(message: string): Promise<any>;
}
