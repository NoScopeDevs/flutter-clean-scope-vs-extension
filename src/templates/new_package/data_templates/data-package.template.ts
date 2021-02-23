import * as changeCase from "change-case";

export function getDataTemplate(name: string, isEmptyProject: boolean): string {
  return isEmptyProject
    ? getBaseDataTemplate(name)
    : getExampleDataTemplate(name);
}

function getExampleDataTemplate(name: string): string {
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Export Models
//TODO: export models

// Export Data Sources
export 'datasources/${snakeCaseName}_datasource.dart';

// Export Repositories Implementation
export 'repositories/${snakeCaseName}_repository.dart';

`;
}

function getBaseDataTemplate(name: string): string {
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Export Models
// TODO: Export models

// Export Data Sources
export 'datasources/local_data_source.dart';
export 'datasources/remote_data_source.dart';

// Export Repositories Implementations
export 'repositories/${snakeCaseName}_repository.dart';`;
}
