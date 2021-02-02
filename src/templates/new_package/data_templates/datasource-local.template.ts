import * as changeCase from "change-case";

export function getLocalDataSourceTemplate(name: string): string {
  return getDefaultLocalDataSourceTemplate(name);
}

function getDefaultLocalDataSourceTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  //   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `abstract class ILocalDataSource {
  // TODO: Define datasource methods
}

class LocalDataSource implements ILocalDataSource {
  // TODO: Implement datasource methods with specific dependencies
}`;
}
