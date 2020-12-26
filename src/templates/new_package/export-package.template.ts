export function getPackageExportTemplate(): string {
  return getDefaultPackageExportTemplate();
}

function getDefaultPackageExportTemplate(): string {
  return `export 'src/data/data.dart';
export 'src/domain/domain.dart';
`;
}
