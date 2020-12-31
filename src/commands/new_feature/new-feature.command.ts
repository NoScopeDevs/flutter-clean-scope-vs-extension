import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";

import {
  //logic
  createProviderTemplate,
  createStateNotifierTemplate,
  createStateTemplate,
} from "./new-feature-file-creation";

export const newFeatureEmpty = async (uri: Uri) => _newFeature(uri, true);

export const newFeatureExample = async (uri: Uri) => _newFeature(uri, false);

const _newFeature = async (
  uri: Uri,
  isEmptyFeature: boolean = false
) => {
  const featureName = await promptForFeatureName();
  if (_.isNil(featureName) || featureName.trim() === "") {
    window.showErrorMessage("The feature name must not be empty");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForFeatureName();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  const pascalCaseFeatureName = changeCase.pascalCase(
    featureName.toLowerCase()
  );
  try {
    await generateFeatureCode(featureName, targetDirectory, isEmptyFeature);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseFeatureName} Feature`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForFeatureName(): Thenable<string | undefined> {
  const featureNamePromptOptions: InputBoxOptions = {
    prompt: "Feature Name",
    placeHolder: "counter",
  };
  return window.showInputBox(featureNamePromptOptions);
}

async function generateFeatureCode(
  featureName: string,
  targetDirectory: string,
  isEmptyFeature: boolean
) {
  const featureDirectoryPath = `${targetDirectory}/${featureName}`;

  //Logic
  const featureLogicDirectory = `${featureDirectoryPath}/logic`;
  

  if (!existsSync(featureDirectoryPath)) {
    await createDirectory(featureDirectoryPath);
    //Logic
    await createDirectory(`${featureLogicDirectory}`);

  }

  await Promise.all([
   createProviderTemplate(featureName,featureLogicDirectory,isEmptyFeature),
createStateNotifierTemplate(featureName,featureLogicDirectory,isEmptyFeature),
  createStateTemplate(featureName,featureLogicDirectory,isEmptyFeature),
  ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
