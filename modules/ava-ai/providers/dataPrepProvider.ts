import { INaturalLanguageContract } from '../interfaces/INaturalLanguageProvider'
import { readFile } from "fs"
import { join } from 'path'

export class DataPrep {
  private setupClassifications = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, '..', 'data', 'classifications.json'), {}, (err, data) => {
        if (err) {
          reject(err.message)
        }

        const parsedData = JSON.parse(data.toString())

        parsedData.forEach((data: any) => {
          data.utterances.forEach(utterance => {
            manager.populateData({ language: 'en', utterance: utterance.utterance, classifier: data.classifier })
          })
        })

        resolve()
      })
    })
  }

  private setupAnswers = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
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
    })
  }

  private setupEntities = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, '..', 'data', 'entities.json'), {}, (err, data) => {
        if (err) {
          reject(err.message)
        }

        const parsedEntities = JSON.parse(data.toString())

        parsedEntities.forEach(data => {
          manager.populateEntities(data.entity['0'], data.entity['1'], data.entity['2'], data.entity['3'])
        })

        resolve()
      })
    })
  }

  public setup = (manager: INaturalLanguageContract) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setupClassifications(manager)
        await this.setupAnswers(manager)
        await this.setupEntities(manager)

        resolve()
      } catch (err) {
        reject(err.message)
      }
    })
  }
}