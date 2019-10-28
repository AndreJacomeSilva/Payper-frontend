/// <reference path="../../Models/ITryResult.d.ts" />

declare interface String
{
    Contains(searchString: string): boolean;
    EndsWith(searchString: string): boolean;
    Format(args: any[]): string;
    IsInvalidDate(): boolean;
    IsIso8601FullDateTimeString(): boolean;
    ReplaceAll(searchString: string, replacement: string): string;
    StartsWith(searchString: string, startPosition?: number): boolean;
    ToCamelCaseFromKebabCase(): string;
    ToCamelCaseFromPascalCase(): string;
    ToKebabCase(): string;
    ToKebabCaseTagElement(): string;
    ToPascalCase(): string;
    ToTagElement(): string;
    TryJsonParse<T>(): ITryResult<T>;
}