import { StorageServiceBase } from "./storageServiceBase";

export abstract class LocalStorageService extends StorageServiceBase
{
    //#region Contructors

    public constructor()
    {
        super(localStorage);
    }

    //#endregion
}