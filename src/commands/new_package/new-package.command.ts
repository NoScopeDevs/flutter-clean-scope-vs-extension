import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";

import {
  createAnalysisOptionsTemplate,
  createPubspecTemplate,
  createPackageExportTemplate,

  //Domain
  createNoParamsEntitiyTemplate,
  createRepositoryTemplate,
  createUseCaseTemplate,
  createExampleUseCaseTemplate,
  createDomainTemplate,

  //Data
  createDataSourceTemplate,
  createIRepositoryTemplate,
  createDataTemplate,
} from "./new-package-file-creation";

export const newPackageEmpty = async (uri: Uri) => _newPackage(uri, true);

export const newPackageExample = async (uri: Uri) => _newPackage(uri, false);

export const _newPackage = async (
  uri: Uri,
  isEmptyProject: boolean = false
) => {
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
    await generatePackageCode(packageName, targetDirectory, isEmptyProject);
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
  isEmptyProject: boolean
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

    //Data
    await createDirectory(`${packageDirectoryData}`);
    await createDirectory(`${packageDirectoryDataModels}`);
    await createDirectory(`${packageDirectoryDataRespositories}`);
    await createDirectory(`${packageDirectoryDataSources}`);

    //Domain
    await createDirectory(`${packageDirectoryDomain}`);
    await createDirectory(`${packageDirectoryDomainEntities}`);
    await createDirectory(`${packageDirectoryDomainRepositories}`);
    await createDirectory(`${packageDirectoryDomainUseCases}`);
  }

  await Promise.all([
    createPubspecTemplate(packageName, targetDirectory),
    createAnalysisOptionsTemplate(packageName, targetDirectory),
    createPackageExportTemplate(packageName, packageDirectoryPath),

    //Data

    isEmptyProject
      ? null
      : createDataSourceTemplate(packageName, packageDirectoryDataSources),
    createIRepositoryTemplate(
      packageName,
      packageDirectoryDataRespositories,
      isEmptyProject
    ),
    createDataTemplate(packageName, packageDirectoryData, isEmptyProject),

    //Domain
    // isEmptyProject
    //   ? null
    //   : createNoParamsEntitiyTemplate(
    //       packageName,
    //       packageDirectoryDomainEntities
    //     ),
    createRepositoryTemplate(
      packageName,
      packageDirectoryDomainRepositories,
      isEmptyProject
    ),
    createUseCaseTemplate(packageName, packageDirectoryDomainUseCases),
    isEmptyProject
      ? null
      : createExampleUseCaseTemplate(
          packageName,
          packageDirectoryDomainUseCases
        ),

    createDomainTemplate(packageName, packageDirectoryDomain, isEmptyProject),
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
