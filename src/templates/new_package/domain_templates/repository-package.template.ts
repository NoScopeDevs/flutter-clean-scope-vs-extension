import * as changeCase from "change-case";

export function getRepositoryTemplate(
  name: string,
  isEmptyPackage: boolean
): string {
  return isEmptyPackage
    ? getBaseRepositoryTemplate(name)
    : getExampleRepositoryTemplate(name);
}

function getExampleRepositoryTemplate(name: string): string {
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
  Future<Either<Failure, int>> exampleFunctionAddition(int currentNumber);
}

    `;
}

function getBaseRepositoryTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  //   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:errors/errors.dart';
import 'package:meta/meta.dart';
import 'package:dartz/dartz.dart';

/// Repository interface for ${name}
@immutable
abstract class ${pascalCaseName}Repository {
  //TODO: Implement Interface
}

    `;
}
