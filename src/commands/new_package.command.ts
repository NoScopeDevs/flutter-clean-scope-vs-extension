import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import {
  getPubsbecPackageTemplate,
} from "../templates";


export const newPackage = async (uri: Uri) => {
  const packageName = await promptForPackageName();
  if (_.isNil(packageName) || packageName.trim() === "") {
    window.showErrorMessage("The package name must not be empty");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForPackageName();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  const pascalCasePackageName = changeCase.pascalCase(packageName.toLowerCase());
  try {
    await generatePackageCode(packageName, targetDirectory);
    window.showInformationMessage(
      `Successfully Generated ${pascalCasePackageName} Package`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForPackageName(): Thenable<string | undefined> {
  const packageNamePromptOptions: InputBoxOptions = {
    prompt: "Package Name",
    placeHolder: "counter",
  };
  return window.showInputBox(packageNamePromptOptions);
}

async function generatePackageCode(
  packageName: string,
  targetDirectory: string,
) {
  const packageDirectoryPath = `${targetDirectory}/${packageName}`;
  if (!existsSync(packageDirectoryPath)) {
    await createDirectory(packageDirectoryPath);
  }

  await Promise.all([
    createPackageTemplate(packageName, targetDirectory),
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

function createPackageTemplate(
  packageName: string,
  targetDirectory: string,
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}/pubspec.yaml`;
  if (existsSync(targetPath)) {
    throw Error(`pubspec.yaml inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getPubsbecPackageTemplate(snakeCasePackageName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}