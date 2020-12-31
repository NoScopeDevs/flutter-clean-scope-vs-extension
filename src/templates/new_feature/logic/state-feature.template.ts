import * as changeCase from "change-case";

export function getStateTemplate(
  name: string,
  isEmptyFeature: boolean
): string {
  return isEmptyFeature
    ? getBaseStateTemplate(name)
    :getBaseStateTemplate(name);
    // : getExampleStateTemplate(name);
}

function getBaseStateTemplate(name: string): string {
    const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `part of '${snakeCaseName}_state_notifier.dart';

abstract class ${pascalCaseName}State extends Equatable {
  ${pascalCaseName}State();
}

class ${pascalCaseName}Initial extends ${pascalCaseName}State{
  @override
  List<Object> get props => throw UnimplementedError();
}

//TODO: Implement states for ${pascalCaseName}State



`;
}
/*
function getExampleStateTemplate(name: string): string {
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
