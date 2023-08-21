import inquirer from "inquirer";
import chalk from "chalk";
import Coordinates from "./coordinates.js";
import Feature from "./feature.js";

export default class FeatureCollection {
  #featureCollection;

  constructor(featureCollection) {
    this.#featureCollection = featureCollection;
  }

  async #selectFeature(
    inquirerType,
    message,
    featureType = null,
    excludingIndex = null
  ) {
    const features = this.#featureCollection.map((feature, index) => {
      const type = feature.getGeoType();
      const name = feature.getName();
      let display = name + " (" + type + ")";
      let disabled = false;
      if ((featureType && featureType !== type) || excludingIndex === index) {
        display = `${chalk.grey(display)}`;
        disabled = "excluded feature";
      }
      const questionObjects = { name: display, value: index, disabled };
      return questionObjects;
    });

    const question = [
      {
        type: inquirerType,
        name: "featureIndexes",
        message: `Select ${message}:`,
        choices: features,
      },
    ];
    const answers = await inquirer.prompt(question);
    if (answers.featureIndexes.length === 0) {
      console.log(
        `  ${chalk.bgRed(" Nothing selected. (Press <space> to select) ")}`
      );
    }
    return answers.featureIndexes;
  }

  listName() {
    this.#featureCollection.forEach((feature) => {
      const type = feature.getGeoType();
      const name = feature.getName();
      console.log(name + " (" + type + ")");
    });
  }

  async decimatePoints() {
    const lineIndexes = await this.#selectFeature(
      "checkbox",
      "LineString",
      "LineString"
    );

    const featureObjects = this.#featureCollection.map((feature, index) => {
      if (lineIndexes.includes(index)) {
        const line = new Coordinates(feature.getCoordinates());
        const decimatedLine = line.decimatePoints();
        const decimatedFeature = feature.cloneAndReplace(decimatedLine);
        return new Feature(decimatedFeature);
      } else {
        return feature;
      }
    });
    return featureObjects;
  }

  async splitLine() {
    const lineIndex = await this.#selectFeature(
      "list",
      "LineString",
      "LineString"
    );
    const pointIndex = await this.#selectFeature("list", "Point", "Point");

    const lineFeature = this.#featureCollection[lineIndex];
    const pointFeature = this.#featureCollection[pointIndex];
    const line = new Coordinates(lineFeature.getCoordinates());
    const splitPoint = pointFeature.getCoordinates();

    const splittedLines = line.splitLine(splitPoint);
    const firstHalfFeature = lineFeature.cloneAndReplace(splittedLines[0]);
    const secondHalfFeature = lineFeature.cloneAndReplace(
      splittedLines[1],
      "split"
    );
    const firstHalfObject = new Feature(firstHalfFeature);
    const secondHalfObject = new Feature(secondHalfFeature);

    const featureObjects = this.#featureCollection;
    featureObjects.splice(lineIndex, 1, firstHalfObject, secondHalfObject);
    return featureObjects;
  }

  async removeFeatures(indexes = []) {
    let removeIndexes = [];
    if (indexes.length === 0) {
      removeIndexes = await this.#selectFeature("checkbox", "feature");
    } else {
      removeIndexes = indexes;
    }

    removeIndexes.reverse();
    const featureObjects = this.#featureCollection;
    for await (const index of removeIndexes) {
      featureObjects.splice(index, 1);
    }
    return featureObjects;
  }

  async invertLines() {
    const invertIndexes = await this.#selectFeature(
      "checkbox",
      "LineString",
      "LineString"
    );
    const featureObjects = this.#featureCollection.map((feature, index) => {
      if (invertIndexes.includes(index)) {
        const invertedLine = feature.getCoordinates().reverse();
        const invertedFeature = feature.cloneAndReplace(invertedLine);
        return new Feature(invertedFeature);
      } else {
        return feature;
      }
    });
    return featureObjects;
  }

  async joinLines() {
    const baseIndex = await this.#selectFeature(
      "list",
      "base line",
      "LineString"
    );
    const followingIndexes = await this.#selectFeature(
      "checkbox",
      "following lines",
      "LineString",
      baseIndex
    );

    const baseFeature = this.#featureCollection[baseIndex];
    let joinedLine = baseFeature.getCoordinates();
    for await (const index of followingIndexes) {
      const followingFeature = this.#featureCollection[index];
      const followingLine = followingFeature.getCoordinates();
      joinedLine = joinedLine.concat(followingLine);
    }
    const joinedFeature = baseFeature.cloneAndReplace(joinedLine);
    const joinedObject = new Feature(joinedFeature);

    const featureObjects = this.#featureCollection;
    featureObjects.splice(baseIndex, 1, joinedObject);
    const joinedCollection = new FeatureCollection(featureObjects);
    const resultObjects = await joinedCollection.removeFeatures(
      followingIndexes
    );
    return resultObjects;
  }
}
