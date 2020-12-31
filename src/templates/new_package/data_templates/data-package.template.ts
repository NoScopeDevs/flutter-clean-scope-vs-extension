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
//TODO: export models
//export 'datasources/your_${snakeCaseName}_datasource.dart';

// Export Data Sources
//TODO: export datasources

// Export Repositories Implementation
export 'repositories/${snakeCaseName}_repository.dart';

`;
}
