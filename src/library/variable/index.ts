import "./number";
import "./string";
import "./array";
import "./math";
import {DateMask} from "./date";

enum FilterTypes {
    EMAIL,
    INT,
    FLOAT
}

enum ClearTypes {
    STRING,
    EMAIL,
    INT,
    FLOAT,
    SEO_URL,
    ALPHABETS
}

class Variable {
    static clear(variable: any, type: ClearTypes = ClearTypes.STRING, clear_html_tags = true): any {
        variable = (typeof variable != "undefined") ? variable : null;
        if (variable !== null) {
            variable = (clear_html_tags) ? variable.toString().stripTags() : variable;
            if (isNaN(variable)) {
                variable = variable.toString().trim();
            }
            switch (type) {
                case ClearTypes.INT:
                    // @ts-ignore
                    variable = Number.parseInt(Variable.filterVar(variable, FilterTypes.INT));
                    break;
                case ClearTypes.FLOAT:
                    // @ts-ignore
                    variable = Number.parseFloat(Variable.filterVar(variable, FilterTypes.FLOAT));
                    break;
                case ClearTypes.ALPHABETS:
                    variable = variable.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\w ]/g, "");
                    break;
                case ClearTypes.EMAIL:
                    variable = Variable.filterVar(variable, FilterTypes.EMAIL);
                    break;
                case ClearTypes.SEO_URL:
                    variable = variable.toString().convertSEOUrl();
                    break;
            }
        }

        return variable;
    }

    static clearAllData(data: object | any, not_column: Array<string> = []): object | any {
        if (!this.isSet(() => data)) return false;

        // @ts-ignore
        for (let [key, _1] of Object.entries(data)) {
            // @ts-ignore
            if (not_column.includes(key)) continue;
            let clear_type = ClearTypes.STRING;
            if (!this.isEmpty(_1)) {
                if (typeof _1 === "object") {
                    this.clearAllData(_1);
                    continue;
                }
                if (!isNaN(Number(_1))) {
                    if (Number(_1).isInt()) clear_type = ClearTypes.INT;
                    else if (Number(_1).isFloat()) clear_type = ClearTypes.FLOAT;
                }
            }
            data[key] = this.clear(_1, clear_type, true);
        }

        return data;
    }

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
            ) return true;
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
        return !Variable.isNull(variable);
    }

    static setDefault(variable: any, default_value: any): any {
        return (this.isSet(variable)) ? variable() : default_value;
    }

    static nestedObjectAssign(target: any, source: any) {
        Object.keys(source).forEach(sourceKey =>{
            if (typeof target[sourceKey] !== "undefined" && typeof source[sourceKey] === "object") {
                target[sourceKey] = this.nestedObjectAssign(target[sourceKey], source[sourceKey]);
            } else {
                target[sourceKey] = source[sourceKey];
            }
        });
        return target;
    }

    private static filterVar(variable: any, filter_type: FilterTypes): string {
        let regex;

        // Check Filter Type
        switch (filter_type) {
            case FilterTypes.EMAIL:
                regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                break;
            case FilterTypes.INT:
                regex = /([0-9]+)/g;
                break;
            case FilterTypes.FLOAT:
                regex = /[+-]?([0-9]*[.])[0-9]+/g;
        }
        // Check Defined
        let match;
        if ((match = regex.exec(variable)) != null) {
            variable = match[0];
        } else {
            variable = "";
        }

        return variable;
    }
}

export {
    DateMask,
    FilterTypes,
    ClearTypes
}
//import the module and enable
new Variable();

export default Variable;




