import { IBasicClientStorageService } from "../Interfaces/IBasicClientStorageService";

export abstract class PermanentStorageService implements IBasicClientStorageService
{
    //#region Properties

    protected StorageService: IBasicClientStorageService;

    public readonly IsAvailable: boolean;

    //#endregion

    //#region Contructors

    public constructor()
    {
    }

    //#endregion

    public abstract GetValue<T>(key: string): T;
    public abstract GetValueString(key: string): string;
    public abstract SetValue<T>(key: string, value: T): void;
    public abstract SetValueString(key: string, valueString: string): void;
    public abstract RemoveByKey(key: string): void;
    public abstract Clear(): void;

    //#endregion
}