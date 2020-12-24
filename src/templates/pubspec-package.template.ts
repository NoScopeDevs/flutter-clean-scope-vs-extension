import * as changeCase from "change-case";

export function getPubsbecPackageTemplate(name: string): string {
    return getDefultPubspecPackageTemplate(name);
}

function getDefultPubspecPackageTemplate(name: string): string {
//   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `name: ${snakeCaseName}
description: Dart package which manages number trivia's domain and data.
version: 1.0.0

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  errors:
    path: ../errors
  network_info:
    path: ../network_info

  dartz: ^0.9.2
  equatable: ^1.2.0
  hive: ^1.4.4+1
  http: ^0.12.2
  meta: ^1.1.8
  very_good_analysis: ^1.0.3
    `;
}
