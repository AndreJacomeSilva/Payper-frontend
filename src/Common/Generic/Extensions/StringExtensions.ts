/// <reference path="interfaces/string.d.ts" />

import { TryResult } from "../Models/TryResult";
import { ITryResult } from "../Models/ITryResult";

export class StringExtensions {
    public static Register() {
        String.prototype.Contains = function (searchString: string): boolean {
            let str: string = this;
            //indexOf returns -1 if not found
            return str.indexOf(searchString) > -1;
        };

        String.prototype.EndsWith = function (searchString: string): boolean {
            let str: string = this,
                doesEndWith: boolean = false;

            if (searchString != null) {
                let indexOfSubstringToCompare: number = str.length - searchString.length;
                doesEndWith = str.substring(indexOfSubstringToCompare) === searchString;
            }
            return doesEndWith;
        };

        String.prototype.Format = function (args: any[]): string {
            let str: string = this;
            for (let i = 0; i < args.length; i++) {
                let reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, args[i]);
            }
            return str;
        };

        String.prototype.IsInvalidDate = function (): boolean {
            let str: string = this;
            return str.toLowerCase() == ("Invalid date").toLowerCase();
        };

        String.prototype.IsIso8601FullDateTimeString = function (): boolean {
            let str: string = this;
            let iso8601FullDateTimeRegex: RegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
            return iso8601FullDateTimeRegex.test(str);
        };

        String.prototype.ReplaceAll = function (searchString: string, replacement: string): string {
            let str: string = this;
            return str.split(searchString).join(replacement);
        };

        String.prototype.StartsWith = function (searchString: string, startPosition?: number): boolean {
            let str: string = this, doesStartWith: boolean = false;
            startPosition = startPosition || 0;

            if (searchString != null) {
                doesStartWith = str.substr(startPosition, searchString.length) === searchString;
            }
            return doesStartWith;
        };

        String.prototype.ToCamelCaseFromKebabCase = function (): string {
            let str: string = this;
            let resultString: string = str.replace(/(\-\w)/g,
                function (m) {
                    return m[1].toUpperCase();
                });
            return resultString;
        };

        String.prototype.ToCamelCaseFromPascalCase = function (): string {
            let str: string = this;
            let resultString: string = str.charAt(0).toLowerCase() + str.slice(1);
            return resultString;
        };

        String.prototype.ToKebabCase = function (): string {
            let str: string = this.toString();

            //lower case first char to avoid a leading slash ("-") in the kebabCaseString
            str = str.charAt(0).toLowerCase() + str.slice(1);

            let kebabRegex: RegExp = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
            let kebabCaseString: string = str.replace(kebabRegex,
                (match) => {
                    return "-" + match.toLowerCase();
                });
            return kebabCaseString;
        };

        String.prototype.ToKebabCaseTagElement = function (): string {
            let str: string = this;
            let tag: string = str.ToKebabCase();
            return tag.ToTagElement();
        };

        String.prototype.ToPascalCase = function (): string {
            let str: string = this;
            let resultString: string = str.match(/[a-z]+/gi)
                .map(function (m) {
                    return m.charAt(0).toUpperCase() + m.substr(1).toLowerCase();
                })
                .join("");

            return resultString;
        };

        String.prototype.ToTagElement = function (): string {
            let str: string = this;
            return "<" + str + "></" + str + ">";
        };

        String.prototype.TryJsonParse = function (): ITryResult<any> {
            let str: string = this;
            let tryResult: ITryResult<any> = new TryResult<any>();
            try {
                tryResult.Result = JSON.parse(str);
                tryResult.HasFulfilled = true;
            }
            catch (ex) {
                tryResult.HasFulfilled = false;
            }
            return tryResult;
        };
    }
}
