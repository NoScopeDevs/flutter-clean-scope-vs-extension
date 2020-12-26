import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";

import {
  createAnalysisOptionsTemplate,
  createPubspecTemplate,

  //Domain
  createNoParamsEntitiyTemplate,
  createRepositoryTemplate,
  createUseCaseTemplate,
  createExampleUseCaseTemplate,
  createDomainTemplate,
} from "./new-package-file-creation";

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

  const pascalCasePackageName = changeCase.pascalCase(
    packageName.toLowerCase()
  );
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
  targetDirectory: string
) {
  const packageDirectoryPath = `${targetDirectory}/${packageName}/lib`;
  const packageDirectorySrc = `${packageDirectoryPath}/src`;

  //Data path
  const packageDirectoryData = `${packageDirectorySrc}/data`;
  const packageDirectoryDataModels = `${packageDirectoryData}/models`;
  const packageDirectoryDataRespositories = `${packageDirectoryData}/repositories`;
  const packageDirectoryDataSources = `${packageDirectoryData}/datasources`;

  //Domain Path
  const packageDirectoryDomain = `${packageDirectorySrc}/domain`;
  const packageDirectoryDomainEntities = `${packageDirectoryDomain}/entities`;
  const packageDirectoryDomainRepositories = `${packageDirectoryDomain}/repositories`;
  const packageDirectoryDomainUseCases = `${packageDirectoryDomain}/usecases`;

  if (!existsSync(packageDirectoryPath)) {
    await createDirectory(packageDirectoryPath);
    await createDirectory(`${packageDirectorySrc}`);

    await createDirectory(`${packageDirectoryData}`);
    await createDirectory(`${packageDirectoryDataModels}`);
    await createDirectory(`${packageDirectoryDataRespositories}`);
    await createDirectory(`${packageDirectoryDataSources}`);

    await createDirectory(`${packageDirectoryDomain}`);
    await createDirectory(`${packageDirectoryDomainEntities}`);
    await createDirectory(`${packageDirectoryDomainRepositories}`);
    await createDirectory(`${packageDirectoryDomainUseCases}`);
  }

  await Promise.all([
    createPubspecTemplate(packageName, targetDirectory),
    createAnalysisOptionsTemplate(packageName, targetDirectory),

    //Domain
    createNoParamsEntitiyTemplate(packageName, packageDirectoryDomainEntities),
    createRepositoryTemplate(packageName, packageDirectoryDomainRepositories),
    createUseCaseTemplate(packageName, packageDirectoryDomainUseCases),
    createExampleUseCaseTemplate(packageName, packageDirectoryDomainUseCases),
    createDomainTemplate(packageName, packageDirectoryDomain),
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
