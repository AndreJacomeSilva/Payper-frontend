import { WebRequestService } from "../Services/WebRequests/WebRequestService";
import { WebRequest } from "../Services/WebRequests/Models/WebRequest";
import { WebRequestMethods } from "../Services/WebRequests/Models/WebRequestMethods";
import { AuthenticationService } from "../Services/Authentication/AuthenticationService";
import { ResponseTypes } from "../Services/WebRequests/Models/ResponseTypes";
import { AsyncErrorResult } from "../Services/WebRequests/Models/AsyncErrorResult";
import { WebMethodRequester } from "../Services/WebRequests/WebMethodRequester";


export abstract class RepositoryBase
{
    //#region Static Properties

    public readonly NotAuthorizedErrorCode: string = "401";

    //#endregion

    //#region Properties

    protected WebRequestService: WebRequestService;
    protected AuthenticationService: AuthenticationService;

    //#endregion

    //#region Constructors

    public constructor(webRequestService: WebRequestService,
        authenticationService: AuthenticationService)
    {
        this.WebRequestService = webRequestService;
        this.AuthenticationService = authenticationService;
    }

    //#endregion

    //#region Methods - RequestGetAsync

    protected RequestGetAsync<TResult>(address: string, validateToken?: boolean): Promise<TResult>
    {
        let request: WebRequest = new WebRequest(address, WebRequestMethods.Get);
        return this.RequestAsync<TResult>(request, validateToken);
    }

    private RequestAsync<TResult>(webRequest: WebRequest, validateToken?: boolean): Promise<TResult>
    {
        let getAction = () =>
        {
            return this.WebRequestService.RequestAsync(webRequest);
        };

        let result: Promise<TResult> = this.CreateWebRequesterPromise(getAction, validateToken);

        return result;
    }

    //#endregion

    //#region Methods - RequestGetImageAsync

    protected RequestGetImageAsync(address: string): Promise<string>
    {
        let webRequest: WebRequest = new WebRequest(address, WebRequestMethods.Get, ResponseTypes.ArrayBuffer);
        return this.RequestAsync(webRequest)
            .then((result: any) =>
            {
                let blob = new Blob([result], { type: "image/jpeg" });
                let resultUrl = URL.createObjectURL(blob);
                return resultUrl;
            });
    }

    //#endregion

    //#region Methods - RequestPostAsync

    protected RequestPostAsync<TResult>(address: string, data: Object, validateToken?: boolean): Promise<TResult>
    {
        let request: WebRequest = new WebRequest(address, WebRequestMethods.Post);
        let jsonData = data != null ? this.PrepareRequestData(data) : null;
        let postAction = () =>
        {
            return this.WebRequestService.RequestAsync(request, jsonData);
        };

        let result: Promise<TResult> = this.CreateWebRequesterPromise(postAction, validateToken);

        return result;
    }

    //#endregion

    //#region Methods - PrepareRequestData

    private PrepareRequestData(data: Object): string
    {
        let jsonData: string = data.Is(String)
            ? data as string
            : JSON.stringify(data);

        return jsonData;
    }

    //#endregion

    //#region Methods - RequestPatchAsync

    protected RequestPatchAsync<TResult>(address: string, data: Object, validateToken?: boolean): Promise<TResult>
    {
        let request: WebRequest = new WebRequest(address, WebRequestMethods.Patch);
        let patchAction = () =>
        {
            return this.WebRequestService.RequestAsync(request, data);
        };

        let result: Promise<TResult> = this.CreateWebRequesterPromise(patchAction, validateToken);

        return result;
    }

    //#endregion

    //#region Methods - RequestPutAsync

    protected RequestPutAsync<TResult>(address: string, data: Object, validateToken?: boolean): Promise<TResult>
    {
        let request: WebRequest = new WebRequest(address, WebRequestMethods.Put);
        let putAction = () =>
        {
            return this.WebRequestService.RequestAsync(request, data);
        };

        let result: Promise<TResult> = this.CreateWebRequesterPromise(putAction, validateToken);

        return result;
    }

    //#endregion

    //#region Methods - RequestDeleteAsync

    protected RequestDeleteAsync<TResult>(address: string, validateToken?: boolean): Promise<TResult>
    {
        let request: WebRequest = new WebRequest(address, WebRequestMethods.Delete);
        let deleteAction = () =>
        {
            return this.WebRequestService.RequestAsync(request, null);
        };

        let result: Promise<TResult> = this.CreateWebRequesterPromise(deleteAction, validateToken);

        return result;
    }

    //#endregion

    protected IsToRetryWebRequest(status: string, webRequester: WebMethodRequester): boolean
    {
        //retry if not authorized error and if there wasn"t an error already in a previous try (to avoid
        //infinite retries)
        return status == this.NotAuthorizedErrorCode
            && !webRequester.HasCompletedErroneously();
    }

    protected RefreshUserAccessTokenAndRetryWebRequest(webRequester: WebMethodRequester,
        rejectAction: (result: any) => void,
        validateToken?: boolean): void
    {
        if (validateToken)
        {
            //TODO: IMPLEMENT REFRESH TOKEN
            // this.AuthenticationService.MarkUserAccessTokenAsExpiredIfExists();
            // let resultPromise = this.AuthenticationService.GetOrRefreshUserAccessTokenAsync();
            // resultPromise.then(result =>
            // {
            //     //request again
            //     webRequester.Request();
            // });
            // resultPromise.catch(reason =>
            // {
            //     rejectAction(reason);
            // });
        }
        else
        {
            webRequester.Request();
        }
    }

    private CreateWebRequesterPromise<TResult>(requestAsyncAction: () => Promise<TResult>,
        validateToken?: boolean): Promise<TResult>
    {
        return new Promise((resolve, reject) =>
        {
            let webMethodRequester = new WebMethodRequester(null,
                (result: any) =>
                {
                    this.OnRequestCompletedSucessfully(result, resolve);
                },
                (reason: AsyncErrorResult<any>) =>
                {
                    this.OnRequestCompletedErroneously(reason, reject, webMethodRequester, validateToken);
                },
                (addr: string) =>
                {
                    return requestAsyncAction();
                });
            webMethodRequester.Request();
        });
    }

    private OnRequestCompletedSucessfully = (
        result: any,
        resolveAction: (result: any) => void) =>
    {
        resolveAction(result);
    }

    private OnRequestCompletedErroneously = (reason: AsyncErrorResult<any>,
        rejectAction: (reason: AsyncErrorResult<any>) => void,
        webRequester: WebMethodRequester,
        validateToken: boolean = true) =>
    {
        //TODO LogService

        if (this.IsToRetryWebRequest(reason.StatusCode, webRequester))
        {
            this.RefreshUserAccessTokenAndRetryWebRequest(webRequester, rejectAction, validateToken);
        }
        else
        {
            rejectAction(reason);
        }
    }
}