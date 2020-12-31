import * as changeCase from "change-case";

import { existsSync, lstatSync, writeFile } from "fs";
import { isEmpty } from "lodash";

import {
  getPubsbecTemplate,
  getAnalysisOptionsTemplate,
  getPackageExportTemplate,

  //Domain
  getNoParamsTemplate,
  getRepositoryTemplate,
  getUseCaseTemplate,
  getExampleUseCaseTemplate,
  getDomainTemplate,

  //Data
  getDataSourceTemplate,
  getIRepositoryTemplate,
  getDataTemplate,
} from "../../templates";

export function createPubspecTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}/pubspec.yaml`;
  if (existsSync(targetPath)) {
    throw Error(`pubspec.yaml inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getPubsbecTemplate(snakeCasePackageName),
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

export function createAnalysisOptionsTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}/analysis_options.yaml`;
  if (existsSync(targetPath)) {
    throw Error(
      `analysis_options.yaml inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getAnalysisOptionsTemplate(), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export function createPackageExportTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(
      `${snakeCasePackageName}.dart inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getPackageExportTemplate(), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

//DOMAIN FILES

export function createNoParamsEntitiyTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/no_params.dart`;
  if (existsSync(targetPath)) {
    throw Error(`no_params.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getNoParamsTemplate(), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export function createIRepositoryTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyProject: boolean
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/i${snakeCasePackageName}_repository.dart`;
  if (existsSync(targetPath)) {
    throw Error(
      `i${snakeCasePackageName}_repository.dart inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getRepositoryTemplate(snakeCasePackageName, isEmptyProject),
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

export function createUseCaseTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/usecase.dart`;
  if (existsSync(targetPath)) {
    throw Error(`usecase.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(targetPath, getUseCaseTemplate(), "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export function createExampleUseCaseTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/example_addition.dart`;
  if (existsSync(targetPath)) {
    throw Error(
      `example_addition.dart inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getExampleUseCaseTemplate(snakeCasePackageName),
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

export function createDomainTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyProject: boolean
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/domain.dart`;
  if (existsSync(targetPath)) {
    throw Error(`domain.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getDomainTemplate(snakeCasePackageName, isEmptyProject),
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

//DATA FILES

export function createDataSourceTemplate(
  packageName: string,
  targetDirectory: string
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}_datasource.dart`;
  if (existsSync(targetPath)) {
    throw Error(
      `${snakeCasePackageName}_datasource.dart inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getDataSourceTemplate(snakeCasePackageName),
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

export function createRepositoryTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyProject: boolean
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}_repository.dart`;
  if (existsSync(targetPath)) {
    throw Error(
      `${snakeCasePackageName}_repository.dart inside ${snakeCasePackageName} already exists`
    );
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getIRepositoryTemplate(snakeCasePackageName, isEmptyProject),
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

export function createDataTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyProject: boolean
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/data.dart`;
  if (existsSync(targetPath)) {
    throw Error(`data.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getDataTemplate(snakeCasePackageName, isEmptyProject),
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
