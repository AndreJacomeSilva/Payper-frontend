import { IClientStorageService } from "../Interfaces/IClientStorageService";

export abstract class StorageServiceBase implements IClientStorageService
{
    //#region Properties

    protected Storage: Storage;

    public readonly IsAvailable: boolean;

    //#endregion

    //#region Contructors

    public constructor(storage: Storage)
    {
        this.Storage = storage;
        this.IsAvailable = this.Storage != null;
    }

    //#endregion

    //#region Methods - GetValue

    public GetValue<T>(key: string): T
    {
        let itemValue: string = this.GetValueString(key);
        let itemValueObject: T = this.GetParsedItemValueIfPossible<T>(itemValue);
        return itemValueObject;
    }

    public GetValueString(key: string): string
    {
        let itemValue: string = null;
        if (this.Storage != null)
        {
            itemValue = this.Storage.getItem(key) || null;
        }
        return itemValue;
    }

    private GetParsedItemValueIfPossible<T>(itemValue: string): T
    {
        let itemValueObject: T = null;
        if (itemValue != null)
        {
            let itemValueParseResult: ITryResult<T> = itemValue.TryJsonParse<T>();
            if (itemValueParseResult.HasFulfilled)
            {
                itemValueObject = itemValueParseResult.Result;
            }
        }
        return itemValueObject;
    }

    //#endregion

    //#region Methods - GetAllKeys

    public GetAllKeys(): Array<string>
    {
        let keys: Array<string> = this.GetAllKeysWhere(k => true);
        return keys;
    }

    public GetAllKeysWhere(predicate: (value: string) => boolean): Array<string>
    {
        let keys: Array<string> = [];
        let storageItemsCount: number = this.Count();
        for (let i = 0; i < storageItemsCount; i++)
        {
            let key: string = this.GetKey(i);
            if (predicate(key))
            {
                keys.Add(key);
            }
        }
        return keys;
    }

    //#endregion

    //#region Methods - Count

    public Count(): number
    {
        let count: number = this.Storage != null
            ? this.Storage.length
            : 0;
        return count;
    }

    //#endregion

    //#region Methods - GetKey

    private GetKey(index: number): string
    {
        return this.Storage.key(index);
    }

    //#endregion

    //#region Methods - SetValue

    public SetValue<T>(key: string, value: T): void
    {
        let valueJsonString: string = JSON.stringify(value);
        this.SetValueString(key, valueJsonString);
    }

    public SetValueString(key: string, valueString: string): void
    {
        this.Storage.setItem(key, valueString);
    }

    //#endregion

    //#region Methods - RemoveByKey

    public RemoveByKey(key: string): void
    {
        this.Storage.removeItem(key);
    }

    //#endregion

    //#region Methods - Clear

    public Clear(): void
    {
        if (this.Storage != null)
        {
            this.Storage.clear();
        }
    }

    //#nedregion
}