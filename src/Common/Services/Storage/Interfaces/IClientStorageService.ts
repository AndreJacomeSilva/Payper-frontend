import { IBasicClientStorageService } from "./IBasicClientStorageService";

export interface IClientStorageService extends IBasicClientStorageService
{
    GetAllKeys(): Array<string>;
    GetAllKeysWhere(predicate: (value: string) => boolean): Array<string>;
    Count(): number;
}
