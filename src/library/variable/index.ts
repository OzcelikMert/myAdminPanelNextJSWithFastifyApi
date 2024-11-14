import './string';

export class VariableLibrary {
  static isSet(...variable: any): boolean {
    let result;
    try {
      for (let i = 0; i < variable.length; i++) {
        result = variable[i]();
      }
    } catch (e) {
      result = undefined;
    } finally {
      return result !== undefined;
    }
  }

  static isEmpty(...variable: any): boolean {
    for (let i = 0; i < variable.length; i++) {
      if (
        !this.isSet(() => variable[i]) ||
        variable[i] === null ||
        variable[i].length === 0 ||
        !variable[i].toString().trim()
      )
        return true;
    }
    return false;
  }

  static isNull(...variable: any) {
    for (let i = 0; i < variable.length; i++) {
      if (variable[i] !== null) return false;
    }
    return true;
  }

  static isNotNull(...variable: any) {
    return !VariableLibrary.isNull(variable);
  }

  static setDefault(variable: any, default_value: any): any {
    return this.isSet(variable) ? variable() : default_value;
  }

  static nestedObjectAssign(target: any, source: any) {
    Object.keys(source).forEach((sourceKey) => {
      if (
        typeof target[sourceKey] !== 'undefined' &&
        typeof source[sourceKey] === 'object'
      ) {
        target[sourceKey] = this.nestedObjectAssign(
          target[sourceKey],
          source[sourceKey]
        );
      } else {
        target[sourceKey] = source[sourceKey];
      }
    });
    return target;
  }
}
