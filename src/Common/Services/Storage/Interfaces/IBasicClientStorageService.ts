export interface IBasicClientStorageService
{
    GetValue<T>(key: string): T;
    GetValueString(key: string): string;
    SetValue<T>(key: string, value: T): void;
    SetValueString(key: string, valueString: string): void;
    RemoveByKey(key: string): void;
    Clear(): void;
}
