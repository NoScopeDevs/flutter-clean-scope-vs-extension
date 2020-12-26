import * as changeCase from "change-case";

export function getRepositoryTemplate(name: string): string {
    return getDefultRepositoryTemplate(name);
}

function getDefultRepositoryTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
//   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:errors/errors.dart';
import 'package:meta/meta.dart';
import 'package:dartz/dartz.dart';

/// Repository interface for ${name}
@immutable
abstract class ${pascalCaseName}Repository {
  //TODO: Implement Interface

  //*Example:
  ///Example of abstract function
  Future<Either<Failure, int>> exampleFunctionAddition();
}

    `;
}
