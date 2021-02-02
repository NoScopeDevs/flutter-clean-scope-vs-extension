import * as changeCase from "change-case";

export function getProviderTemplate(
  name: string,
  isEmptyFeature: boolean
): string {
  return isEmptyFeature
    ? getBaseProviderTemplate(name)
    :getBaseProviderTemplate(name);
    // : getExampleProviderTemplate(name);
}

function getBaseProviderTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  const cammelCaseName = changeCase.camelCase(name.toLowerCase());
  return `part '${snakeCaseName}_state_notifier.dart';

/// Provider to use the ${pascalCaseName}StateNotifier
final ${cammelCaseName}NotifierProvider = StateNotifierProvider(
  (ref) => ${pascalCaseName}Notifier(),
);

/// ${pascalCaseName}Repository Provider
final _${snakeCaseName}RepositoryProvider = Provider<I${pascalCaseName}Repository>(
  (_) => ${pascalCaseName}Repository(),
);

/// Use cases`;
}
/*
function getExampleProviderTemplate(name: string): string {
  //   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `// Entities
//TODO: export entities
// export 'entities/your_entity.dart';

// Export Repositories
export 'repositories/i${snakeCaseName}_repository.dart';

// Export Use Cases
//TODO: export usecases
export 'usecases/example_addition.dart';
`;
}*/
