import * as changeCase from "change-case";

export function getIRepositoryTemplate(name: string): string {
  return getDefaultIRepositoryTemplate(name);
}

function getDefaultIRepositoryTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  const camelCaseName = changeCase.camelCase(name.toLowerCase());
  return `import 'package:meta/meta.dart';
import 'package:dartz/dartz.dart';
import 'package:errors/errors.dart';
import 'package:network_manager/network_manager.dart';

import 'package:${snakeCaseName}/src/data/datasources/${snakeCaseName}_datasource.dart';

//Domain
import 'package:${snakeCaseName}/src/domain/repositories/${snakeCaseName}_repository.dart';

typedef _ExampleResultFunction = Future<int> Function();

///Cunter repo implementation
class I${pascalCaseName}Repository implements ${pascalCaseName}Repository {
  ///Counter repo constructor
  I${pascalCaseName}Repository({
    @required ${pascalCaseName}DataSource ${camelCaseName}DataSource,
    @required NetworkManager networkManager,
  })  : assert(${camelCaseName}DataSource != null),
        _${camelCaseName}DataSource = ${camelCaseName}DataSource,
        _networkManager = networkManager;

  final ${pascalCaseName}DataSource _${camelCaseName}DataSource;
  final NetworkManager _networkManager;

  //TODO: Implement temlate repository

  //*Example:
  @override
  Future<Either<Failure, int>> exampleFunctionAddition() {
    return _getAddition(_${camelCaseName}DataSource.exampleAddition);
  }

  Future<Either<Failure, int>> _getAddition(
    _ExampleResultFunction ${camelCaseName}UseCase,
  ) async {
    if (await _networkManager.isConnected) {
      try {
        final result = await ${camelCaseName}UseCase();
        return Right(result);
      } on ServerException {
        return Left(ServerFailure());
      } catch (e) {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }
}

`;
}
