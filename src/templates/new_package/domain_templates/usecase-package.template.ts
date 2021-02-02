import * as changeCase from "change-case";

export function getUseCaseTemplate(name: string): string {
    return getDefaultUseCaseTemplate(name);
}

export function getExampleUseCaseTemplate(name: string): string {
    return getDefaultExampleUseCaseTemplate(name);
}

function getDefaultUseCaseTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:dartz/dartz.dart';
import 'package:errors/errors.dart';
import 'package:meta/meta.dart';

import '../repositories/i${snakeCaseName}_repository.dart';

class UseCase {
  UseCase({@required this.repository}) : assert(repository != null);

  final I${pascalCaseName}Repository repository;

  /// Callable class method
  Future<Either<Failure, Object>> call() async {
    /// TODO: Call specific repository method
  }
}`;
}


function getDefaultExampleUseCaseTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  const cammelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:meta/meta.dart';
import 'package:dartz/dartz.dart';
import 'package:errors/errors.dart';

import '../repositories/i${snakeCaseName}_repository.dart';

import 'usecase.dart';

///Increment Counter usecase
class ExampleAddition implements UseCase<int, int> {
  /// Example Addition constructor
  ExampleAddition({
    @required I${pascalCaseName}Repository ${cammelCase}Repo,
  })  : assert(${cammelCase}Repo != null),
        _${cammelCase}Repo = ${cammelCase}Repo;

  final I${pascalCaseName}Repository _${cammelCase}Repo;

  @override
  Future<Either<Failure, int>> call(int currentNumber) async {
    return await _${cammelCase}Repo.exampleFunctionAddition(currentNumber);
  }
}
`;
}
