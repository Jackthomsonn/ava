import { INaturalLanguageContract } from '../interfaces/INaturalLanguageProvider';
import { readFile } from "fs";
import { join } from 'path';

export class DataPrep {
  constructor() { }

  public setup = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, '..', 'data', 'greetings.json'), {}, (err, data) => {
        if (err) {
          reject(err.message);
        }

        const parsedData = JSON.parse(data.toString())

        parsedData.forEach((data: any) => {
          data.greetings.forEach(greeting => {
            manager.populateData({ language: 'en', greeting: greeting.greeting, classifier: data.classifier })
          })
        })

        readFile(join(__dirname, '..', 'data', 'answers.json'), {}, (err, data) => {
          if (err) {
            reject(err.message)
          }

          const parsedAnswers = JSON.parse(data.toString())

          parsedAnswers.forEach(data => {
            manager.populateAnswers({ language: 'en', classifier: data.classifier, answer: data.answer })
          })

          resolve()
        })
      });
    })
  }
}