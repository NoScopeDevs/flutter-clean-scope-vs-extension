import * as changeCase from "change-case";

export function getDataSourceTemplate(name: string): string {
  return getDefaultDataSourceTemplate(name);
}

function getDefaultDataSourceTemplate(name: string): string {
  const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  //   const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:dio/dio.dart';
import 'package:errors/errors.dart';

/// Interface for ${pascalCaseName} data source
abstract class ${pascalCaseName}DataSource {
  //TODO: Implement datasource interface

  //*Example
  ///Make example addition
  Future<int> exampleAddition();
}

/// ${pascalCaseName} data source implementation
class I${pascalCaseName}DataSource implements ${pascalCaseName}DataSource {
  //TODO: Implement interface

  final Dio _dio = Dio();

  //* Example
  ///Example implementation of addition with API
  @override
  Future<int> exampleAddition() async {
    return await _incrementCounterFromApi('1 + 1');
  }

  Future<int> _incrementCounterFromApi(String operation) async {
    final response = await _dio.post(
      'https://api.mathjs.org/v4/',
      options: RequestOptions(
        headers: {'Content-Type': 'application/json'},
      ),
      data: {'expr': operation},
    );

    if (response.statusCode == 200) {
      final result = response.data['result'];
      return result;
    } else {
      throw ServerException();
    }
  }
}
`;
}
