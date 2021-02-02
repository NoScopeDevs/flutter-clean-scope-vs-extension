import * as changeCase from "change-case";

export function getPubsbecTemplate(name: string): string {
  return getDefultPubspecTemplate(name);
}

function getDefultPubspecTemplate(name: string): string {
  //   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `name: ${snakeCaseName}
description: Dart package to manage {Feature} data and domain layers.
version: 0.0.1+1

environment:
  sdk: ">=2.9.0 <3.0.0"

dependencies:
  # Scope Packages
  errors:
    git:
      url: git://github.com/NoScopeDevs/errors
  network_manager:
    git:
      url: git://github.com/NoScopeDevs/network_manager

  dartz:
  freezed_annotation:
  meta:
  path:

dev_dependencies:
  # code generators
  build_runner:
  freezed:
  json_serializable:

  # testing
  mockito:
  test:

  # static analysis
  very_good_analysis:`;
}
