import * as changeCase from "change-case";

export function getUseCaseTemplate(): string {
    return getDefultUseCaseTemplate();
}

export function getExampleUseCaseTemplate(name: string): string {
    return getDefultExampleUseCaseTemplate(name);
}

function getDefultUseCaseTemplate(): string {
//   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
//   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:dartz/dartz.dart';
import 'package:errors/errors.dart';

/// Interface for usecases
abstract class UseCase<Type, UseCaseParam> {
  //TODO: Change UseCase Type
  /// method call on class creation
  Future<Either<Failure, Type>> call(UseCaseParam params);
}
 `;
}


function getDefultExampleUseCaseTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  const cammelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:meta/meta.dart';
import 'package:dartz/dartz.dart';
import 'package:errors/errors.dart';

import '../entities/no_params.dart';
import '../repositories/${snakeCaseName}_repository.dart';

import 'usecase.dart';

///Increment Counter usecase
class ExampleAddition implements UseCase<int, NoParams> {
  /// Example Addition constructor
  ExampleAddition({
    @required ${pascalCaseName}Repository ${cammelCase}Repo,
  })  : assert(${cammelCase}Repo != null),
        _${cammelCase}Repo = ${cammelCase}Repo;

  final ${pascalCaseName}Repository _${cammelCase}Repo;

  @override
  Future<Either<Failure, int>> call(NoParams params) async {
    return await _${cammelCase}Repo.exampleFunctionAddition();
  }
}
`;
}
