import * as changeCase from "change-case";

export function getRemoteDataSourceTemplate(name: string): string {
  return getDefaultRemoteDataSourceTemplate(name);
}

function getDefaultRemoteDataSourceTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  //   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `abstract class IRemoteDataSource {
// TODO: Define datasource methods
}

class RemoteDataSource implements IRemoteDataSource {
// TODO: Implement datasource methods with specific dependencies
}`;
}
