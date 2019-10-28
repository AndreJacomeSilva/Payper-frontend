declare interface Array<T>
{
    Add(item: T): void;
    AddIfNotExists(item: T, propertySelector?: (value: T) => void): void;
    AddIfNotNull(item: T): void;
    AddRange(items: Array<T>): void;
    Any(): boolean;
    AreEquals(arrayToCompare: Array<any>): boolean;
    Clear(): void;
    Contains(item: T): boolean;
    Count(): number;
    FirstOrDefault(): T;
    GetValueByKey (key: string): any;
    Insert(item: T, index: number): void;
    InsertRange(items: Array<T>, index: number): void;
    LastOrDefault(): T;
    OrderByAscending(propertySelector?: (value: T) => void): Array<T>;
    OrderByDescending(propertySelector?: (value: T) => void): Array<T>;
    Remove(item: T, propertySelector?: (value: T) => void): boolean;

    /**
      * Removes the first item of the array and returns it.
      */
    RemoveFirst(): any;

    /**
      * Removes the last item of the array and returns it.
      */
    RemoveLast(): any;

    RemoveRange(items: Array<T>): boolean;
    RemoveWhere(predicate: (value: T) => boolean): boolean;
    Select(expression: (value: T) => void): Array<any>;
    Sum(): number;
    ToArray(): Array<T>;
    Where(predicate: (value: T) => boolean): Array<T>;
}
