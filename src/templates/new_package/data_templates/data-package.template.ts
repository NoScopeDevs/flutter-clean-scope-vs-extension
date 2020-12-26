import * as changeCase from "change-case";

export function getDataTemplate(name: string): string {
  return getDefaultDataTemplate(name);
}

function getDefaultDataTemplate(name: string): string {
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Export Models
//TODO: export models

// Export Data Sources
export 'datasources/${snakeCaseName}_datasource.dart';

// Export Repositories Implementation
export 'repositories/i${snakeCaseName}_repository.dart';

`;
}
