import { readFile } from "fs";
import { join } from "path";
import { INaturalLanguageContract } from "../interfaces/INaturalLanguageProvider";

export class DataPrep {
  public setup = (manager: INaturalLanguageContract) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setupClassifications(manager);
        await this.setupAnswers(manager);
        await this.setupEntities(manager);

        resolve({});
      } catch (err) {
        reject(err.message);
      }
    });
  }

  private setupClassifications = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, "..", "data", "classifications.json"), {}, (err, data) => {
        if (err) {
          reject(err.message);
        }

        const parsedData = JSON.parse(data.toString());

        parsedData.forEach((classifications: any) => {
          classifications.utterances.forEach((utterance) => {
            manager.populateData({
              classifier: classifications.classifier,
              language: "en",
              utterance: utterance.utterance,
            });
          });
        });

        resolve({});
      });
    });
  }

  private setupAnswers = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, "..", "data", "answers.json"), {}, (err, data) => {
        if (err) {
          reject(err.message);
        }

        const parsedAnswers = JSON.parse(data.toString());

        parsedAnswers.forEach((parsedAnswer) => {
          manager.populateAnswers({ language: "en", classifier: parsedAnswer.classifier, answer: parsedAnswer.answer });
        });

        resolve({});
      });
    });
  }

  private setupEntities = (manager: INaturalLanguageContract) => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, "..", "data", "entities.json"), {}, (err, data) => {
        if (err) {
          reject(err.message);
        }

        const parsedEntities = JSON.parse(data.toString());

        parsedEntities.forEach((parsedEntity) => {
          manager.populateEntities(
            parsedEntity.entity[ "0" ],
            parsedEntity.entity[ "1" ],
            parsedEntity.entity[ "2" ],
            parsedEntity.entity[ "3" ],
          );
        });

        resolve({});
      });
    });
  }
}
