import { AsyncErrorResult } from "./Models/AsyncErrorResult";

export type RequestCompletedSuccessfullyAction = (result: any) => void;
export type RequestCompletedErroneouslyAction = (reason?: AsyncErrorResult<any>) => void;
export type RequestAsyncAction = (address: string) => Promise<any>;

export class WebMethodRequester
{
    //#region Fields

    private hasCompletedErroneously: boolean = false;

    //#endregion

    //#region Properties

    public Address: string;
    public AddressTemplate: string;
    public CompletedSuccessfullyAction: RequestCompletedSuccessfullyAction;
    public CompletedErroneouslyAction: RequestCompletedErroneouslyAction;
    public ContextId: string;
    public RequestAsyncAction: RequestAsyncAction;
    public SessionId: string;

    //#endregion

    //#region Constructors

    public constructor(address: string,
        completedSuccessfullyAction: RequestCompletedSuccessfullyAction,
        completedErroneouslyAction: RequestCompletedErroneouslyAction,
        requestAsyncAction: RequestAsyncAction)
    {
        this.Address = address;
        this.AddressTemplate = address;
        this.CompletedSuccessfullyAction = completedSuccessfullyAction;
        this.CompletedErroneouslyAction = this.WrapCompletedErroneouslyAction(completedErroneouslyAction);
        this.RequestAsyncAction = requestAsyncAction;
    }

    //#endregion

    //#region Methods - WrapCompletedErroneouslyAction

    private WrapCompletedErroneouslyAction(
        completedErroneouslyAction: RequestCompletedErroneouslyAction): RequestCompletedErroneouslyAction
    {
        let action = (reason: AsyncErrorResult<any>) =>
        {
            completedErroneouslyAction(reason);
            this.hasCompletedErroneously = true;
        };
        return action;
    }

    //#endregion

    //#region Methods - Request

    public Request(): void
    {
        this.RequestAsyncAction(this.Address)
            .then((result) =>
            {
                this.CompletedSuccessfullyAction(result);
            })
            .catch((reason: AsyncErrorResult<any>) =>
            {
                this.CompletedErroneouslyAction(reason);
            });
    }

    //#endregion

    //#region Methods - Clone

    public Clone(): WebMethodRequester
    {
        let webMethodRequester = new WebMethodRequester(this.Address,
            this.CompletedSuccessfullyAction,
            this.CompletedErroneouslyAction,
            this.RequestAsyncAction);
        webMethodRequester.ContextId = this.ContextId;
        webMethodRequester.SessionId = this.SessionId;
        return webMethodRequester;
    }

    //#endregion

    //#region Methods - HasCompletedErroneously

    public HasCompletedErroneously(): boolean
    {
        return this.hasCompletedErroneously;
    }

    //#endregion

}