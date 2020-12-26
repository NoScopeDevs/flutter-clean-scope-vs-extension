import * as changeCase from "change-case";

export function getDomainTemplate(name: string): string {
    return getDefaultDomainTemplate(name);
}

function getDefaultDomainTemplate(name: string): string {
//   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Entities
//TODO: export entities
// export 'usecases/your_entity.dart';

// Export Repositories
export 'repositories/${snakeCaseName}_repository.dart';

// Export Use Cases
export 'usecases/example_addition.dart';
`;
}
