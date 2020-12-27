import * as changeCase from "change-case";

export function getDomainTemplate(
  name: string,
  isEmptyProject: boolean
): string {
  return isEmptyProject
    ? getBaseDomainTemplate(name)
    : getExampleDomainTemplate(name);
}

function getBaseDomainTemplate(name: string): string {
  //   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Entities
//TODO: export entities
// export 'entities/your_entity.dart';

// Export Repositories
export 'repositories/${snakeCaseName}_repository.dart';

// Export Use Cases
//export 'usecases/your_usecase.dart';
`;
}

function getExampleDomainTemplate(name: string): string {
  //   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Entities
//TODO: export entities
// export 'entities/your_entity.dart';

// Export Repositories
export 'repositories/${snakeCaseName}_repository.dart';

// Export Use Cases
//TODO: export usecases
export 'usecases/example_addition.dart';
`;
}
