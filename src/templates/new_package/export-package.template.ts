import * as changeCase from "change-case";

export function getPackageExportTemplate(name: string): string {
  return getDefaultPackageExportTemplate(name);
}

function getDefaultPackageExportTemplate(name: string): string {
  const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
  return `library ${snakeCaseName};
  
export 'src/data/data.dart';
export 'src/domain/domain.dart';
`;
}
