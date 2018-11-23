export interface INaturalLanguageContract {
  process(options: any): PromiseLike<any>

  populateData(options: any): void

  populateAnswers(options: any): void

  feed(): PromiseLike<any>
}