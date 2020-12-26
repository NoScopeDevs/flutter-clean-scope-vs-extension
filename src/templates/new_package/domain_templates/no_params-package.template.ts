import * as changeCase from "change-case";

export function getNoParamsTemplate(): string {
    return getDefultNoParamsTemplate();
}

function getDefultNoParamsTemplate(): string {
//   const pascalCaseName = changeCase.pascalCase(name.toLowerCase());
  return `/// No Parameter Class
class NoParams {
  /// No Parameter Class Constructor
  NoParams();
}
    `;
}
