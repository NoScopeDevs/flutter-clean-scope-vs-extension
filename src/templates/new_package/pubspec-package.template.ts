import * as changeCase from "change-case";

export function getPubsbecTemplate(name: string): string {
  return getDefultPubspecTemplate(name);
}

function getDefultPubspecTemplate(name: string): string {
  //   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `name: ${snakeCaseName}
description: Dart package
version: 1.0.0

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  errors:
    git:
      url: git://github.com/NoScopeDevs/errors
  network_manager:
    git:
      url: git://github.com/NoScopeDevs/network_manager
  dartz: ^0.9.2
  dio: ^3.0.10
  equatable: ^1.2.5
  hive: ^1.4.4+1
  meta: ^1.2.4
  very_good_analysis: ^1.0.4
    `;
}
