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
  return `import 'package:equatable/equatable.dart';
import 'package:riverpod/all.dart';
import 'package:${snakeCaseName}/${snakeCaseName}.dart';

part '${snakeCaseName}_state.dart';
part '${snakeCaseName}_provider.dart';

/// ${pascalCaseName} State notifier
final ${cammelCaseName}NotifierProvider = StateNotifierProvider(
  (ref) =>
      ${pascalCaseName}Notifier(),
);

///${pascalCaseName}Notifier implementation of StateNotifier for ${pascalCaseName}State
class ${pascalCaseName}Notifier extends StateNotifier<${pascalCaseName}State> {
  ///${pascalCaseName} Notifier Constructor
  ${pascalCaseName}Notifier():
        super(${pascalCaseName}Initial());

    //TODO: Implement ${pascalCaseName}StateNotifier logic
}
`;
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
