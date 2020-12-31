import * as changeCase from "change-case";

import { existsSync, lstatSync, writeFile } from "fs";
import { isEmpty } from "lodash";

import {
  //logic
  getProviderTemplate,
  getStateNotifierTemplate,
  getStateTemplate,

} from "../../templates/new_feature/new_feature";


//logic
export function createProviderTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyFeature: boolean = true,
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}_provider.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCasePackageName}_provider.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getProviderTemplate(snakeCasePackageName,isEmptyFeature),
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

export function createStateNotifierTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyFeature: boolean = true,
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}_state_notifier.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCasePackageName}_state_notifier.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getStateNotifierTemplate(snakeCasePackageName,isEmptyFeature),
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

export function createStateTemplate(
  packageName: string,
  targetDirectory: string,
  isEmptyFeature: boolean = true,
) {
  const snakeCasePackageName = changeCase.snakeCase(packageName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCasePackageName}_state.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCasePackageName}_state.dart inside ${snakeCasePackageName} already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getStateTemplate(snakeCasePackageName,isEmptyFeature),
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