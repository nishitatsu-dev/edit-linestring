import * as fs from "node:fs/promises";
import path from "node:path";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import chalk from "chalk";
import Feature from "./feature.js";

export default class FileOperation {
  #inputFile;

  constructor(inputFile) {
    this.#inputFile = inputFile;
  }

  async #makeNewFile() {
    const directoryName = path.dirname(this.#inputFile);
    inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
    const question = [
      {
        type: "file-tree-selection",
        name: "directory",
        message: `Choose a directory to save.  (Press ${chalk.red(
          "<space>"
        )} to go into directory):`,
        onlyShowDir: true,
        root: directoryName,
        enableGoUpperDirectory: true,
        validate: (input) => {
          const name = input.split(path.sep).pop();
          return name[0] !== ".";
        },
        onlyShowValid: true,
      },
      {
        type: "input",
        name: "file",
        message: `Write file name (base data file is shown at the first answer):`,
      },
    ];
    const answers = await inquirer.prompt(question);
    const outputFilePath = answers.directory + path.sep + answers.file;
    return outputFilePath;
  }

  async #overwriteFile() {
    const directoryName = path.dirname(this.#inputFile);
    inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
    const question = [
      {
        type: "file-tree-selection",
        name: "path",
        message: `Choose an output file. (Press ${chalk.red(
          "<space>"
        )} to go into directory):`,
        root: directoryName,
        enableGoUpperDirectory: true,
        validate: (input) => {
          const name = input.split(path.sep).pop();
          return name[0] !== ".";
        },
        onlyShowValid: true,
      },
    ];
    const answers = await inquirer.prompt(question);
    return answers.path;
  }

  async #selectOutputFile() {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "outputWay",
        message: "Choose output way:",
        choices: ["Make new file", "Overwrite file"],
      },
    ]);

    const outputFilePath =
      answers.outputWay === "Make new file"
        ? await this.#makeNewFile()
        : await this.#overwriteFile();
    return outputFilePath;
  }

  async writeFile(featureObjects) {
    const features = featureObjects.map((feature) => feature.getFeature());
    const geoJsonObject = { type: "FeatureCollection", features };
    const geoJson = JSON.stringify(geoJsonObject, null, 2);
    const outputFile = await this.#selectOutputFile();
    await fs.writeFile(outputFile, geoJson);
  }

  async readFile() {
    const geoJson = await fs.readFile(this.#inputFile, {
      encoding: "utf8",
    });
    const { features } = JSON.parse(geoJson);
    const featureObjects = features.map((feature) => new Feature(feature));
    return featureObjects;
  }
}
