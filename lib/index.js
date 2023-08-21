#!/usr/bin/env node

import path from "node:path";
import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import FileOperation from "./file_operation.js";
import FeatureCollection from "./feature_collection.js";

program
  .option("-l, --list", "list the names of Features in the file")
  .option("-d, --decimate", "decimate points every ~10 meters")
  .option("-s, --split", "split LineString at a Point")
  .option("-j, --join", "join LineStrings")
  .option("-r, --remove", "remove Features")
  .option("-i, --invert", "invert start and end of a LineString");
program.parse();
const options = program.opts();

//NOTE - In the case that option is not specified.
let selectedMethod = null;
if (Object.keys(options).length !== 1) {
  const editingMethods = [
    { name: "list:     list the names of Features in the file", value: "l" },
    { name: "decimate: decimate points every ~10 meters", value: "d" },
    { name: "split:    split LineString at a Point", value: "s" },
    { name: "join:     join LineStrings", value: "j" },
    { name: "remove:   remove Features", value: "r" },
    { name: "invert:   invert start and end of a LineString", value: "i" },
  ];

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "method",
      message: `Select editing method:`,
      choices: editingMethods,
    },
  ]);
  selectedMethod = answers.method;
}

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);
const baseDataFile = await inquirer.prompt([
  {
    type: "file-tree-selection",
    name: "path",
    message: `Choose an base data file. (Press ${chalk.red(
      "<space>"
    )} to go into directory):`,
    enableGoUpperDirectory: true,
    validate: (input) => {
      const name = input.split(path.sep).pop();
      return name[0] !== ".";
    },
    onlyShowValid: true,
  },
]);

const fileOperation = new FileOperation(baseDataFile.path);
const featureObjects = await fileOperation.readFile();
const featureCollection = new FeatureCollection(featureObjects);

let editedObjects = null;
if (options.list || selectedMethod === "l") {
  featureCollection.listName();
} else if (options.decimate || selectedMethod === "d") {
  editedObjects = await featureCollection.decimatePoints();
} else if (options.split || selectedMethod === "s") {
  editedObjects = await featureCollection.splitLine();
} else if (options.join || selectedMethod === "j") {
  editedObjects = await featureCollection.joinLines();
} else if (options.remove || selectedMethod === "r") {
  editedObjects = await featureCollection.removeFeatures();
} else if (options.invert || selectedMethod === "i") {
  editedObjects = await featureCollection.invertLines();
}

if (editedObjects) {
  await fileOperation.writeFile(editedObjects);
}
