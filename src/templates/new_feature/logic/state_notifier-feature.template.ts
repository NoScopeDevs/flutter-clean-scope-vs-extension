import * as changeCase from "change-case";

export function getStateNotifierTemplate(
  name: string,
  isEmptyFeature: boolean
): string {
  return isEmptyFeature
    ? getBaseStateNotifierTemplate(name)
    :getBaseStateNotifierTemplate(name);
    // : getExampleStateNotifierTemplate(name);
}

function getBaseStateNotifierTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  const cammelCaseName = changeCase.camelCase(name.toLowerCase());
  return `part of '${snakeCaseName}_provider.dart';
// TODO: Implement ${pascalCaseName} StateNotifier

/// Defines all the ${pascalCaseName} logic the app will use
class ${pascalCaseName}Notifier extends StateNotifier<${pascalCaseName}State> {
  /// Base constructor expects a [ProviderReference] to 
  /// read its usecases and also defines inital state
  ${pascalCaseName}Notifier(ProviderReference ref) : super(${pascalCaseName}State.initial());
}`;
}
/*
function getExampleStateNotifierTemplate(name: string): string {
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
