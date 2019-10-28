export class AsyncErrorResult<TErrorPayload>
{
    //#region Properties 

    public Reason: TErrorPayload;
    public StatusCode: string;

    //#endregion

    //#region Constructors

    public constructor(reason: TErrorPayload, statusCode: string) 
    {
        this.Reason = reason;
        this.StatusCode = statusCode;
    }

    //#endregion
}