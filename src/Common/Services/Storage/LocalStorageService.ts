import { Injectable } from "@angular/core";
import { LocalStorageService as LocalStorageServiceBase } from "./Bases/LocalStorageService";

@Injectable()
export class LocalStorageService extends LocalStorageServiceBase
{
    //#region Contructors

    public constructor()
    {
        super();
    }

    //#endregion
}