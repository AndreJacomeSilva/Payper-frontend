import { Injectable } from "@angular/core";
import { PermanentStorageService as PermanentStorageServiceBase } from "./Bases/PermanentStorageService";
import { IBasicClientStorageService } from "./Interfaces/IBasicClientStorageService";
import { LocalStorageService } from "./Bases/LocalStorageService";


@Injectable()
export class PermanentStorageService extends PermanentStorageServiceBase
{
    //#region Properties

    protected StorageService: IBasicClientStorageService;

    //#endregion

    //#region Contructors

    public constructor(localStorageService: LocalStorageService)
    {
        super();

        this.SetStorageService(localStorageService);
    }

    //#endregion

    //#region Methods - SetStorageService

    private SetStorageService(localStorageService: LocalStorageService): void
    {
        if (localStorageService.IsAvailable)
        {
            this.StorageService = localStorageService;
        }
        else
        {
            throw new Error("No available permanent storage services.");
        }
    }

    //#endregion

    //#region Methods - Get

    public GetValue<T>(key: string): T
    {
        return this.StorageService.GetValue<T>(key);
    }

    public GetValueString(key: string): string
    {
        return this.StorageService.GetValueString(key);
    }

    //#endregion

    //#region Methods - Set

    public SetValue<T>(key: string, value: T): void
    {
        return this.StorageService.SetValue<T>(key, value);
    }

    public SetValueString(key: string, valueString: string): void
    {
        return this.StorageService.SetValueString(key, valueString);
    }

    //#endregion

    //#region Methods - Remove

    public RemoveByKey(key: string): void
    {
        return this.StorageService.RemoveByKey(key);
    }

    public Clear(): void
    {
        return this.StorageService.Clear();
    }

    //#endregion
}