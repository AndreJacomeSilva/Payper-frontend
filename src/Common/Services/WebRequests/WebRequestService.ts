import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { WebRequest } from "./Models/WebRequest";
import { ResponseTypes } from "./Models/ResponseTypes";
import { TryResult } from "../../../Common/Generic/Models/TryResult";
import { AsyncErrorResult } from "./Models/AsyncErrorResult";
import { AuthenticationService } from "../../../Common/Services/Authentication/AuthenticationService";

@Injectable({
    providedIn: "root",
  })
export class WebRequestService
{
    private httpService: HttpClient;
    private readonly contentType: string = "application/json; charset=utf-8";
    private authenticationService: AuthenticationService;

    public constructor(httpService: HttpClient,
                       authenticationService: AuthenticationService)
    {
        this.httpService = httpService;
        this.authenticationService = authenticationService;
    }

    public RequestAsync(webRequest: WebRequest, data?: Object): Promise<any>
    {
        let contentType: string = webRequest.ContentType || this.contentType;
        let requestData: Object = data || null;
        let authorization = "Bearer " + this.authenticationService.GetToken();
        let headers: HttpHeaders = this.CreateHeaders(contentType, authorization);
        let request: HttpRequest<Object> = this.CreateRequest(webRequest, headers, requestData);

        return this.httpService.request(request).toPromise()
            .then((result: HttpResponse<Object>) =>
            {
                return this.OnRequestFulfilled(result, webRequest);
            })
            .catch((reason) =>
            {
                return this.OnRequestError(reason, webRequest);
            });
    }

    public RequestUsingHttpServiceWithoutAuth(webRequest: WebRequest, data: Object): Promise<any>
    {
        let contentType: string = webRequest.ContentType || this.contentType;
        let requestData: Object = data || null;
        let request: HttpRequest<Object> = this.CreateRequest(webRequest, null, requestData);

        return this.httpService.request(request).toPromise()
            .then((result: HttpResponse<Object>) =>
            {
                return this.OnRequestFulfilled(result, webRequest);
            })
            .catch((reason) =>
            {
                return this.OnRequestError(reason, webRequest);
            });
    }

    private CreateHeaders(contentType: string, authorization: string): HttpHeaders
    {
        let headers = new HttpHeaders({
            "Authorization": authorization
        });
        return headers;
    }

    private CreateRequest(webRequest: WebRequest, headers?: HttpHeaders, requestData?: Object): HttpRequest<Object>
    {
        let responseType = this.GetResponseType(webRequest);
        let request = new HttpRequest(webRequest.RequestMethod,
            webRequest.Address,
            requestData,
            {
                headers: headers,
                responseType: responseType
            },
        );
        return request;
    }

    private GetResponseType(webRequest: WebRequest): "arraybuffer" | "blob" | "json" | "text"
    {
        let responseType: any = "json";
        if (webRequest.ResponseType == ResponseTypes.ArrayBuffer)
        {
            responseType = "arraybuffer";
        }
        else if (webRequest.ResponseType == ResponseTypes.Text)
        {
            responseType = "text";
        }
        return responseType;
    }

    private OnRequestFulfilled(result: HttpResponse<Object>, webRequest: WebRequest): Promise<Object>
    {
        if (webRequest.ResponseType == ResponseTypes.Json)
        {
            return this.ParseJsonResponse(result);
        }
        else
        {
            return Promise.resolve(result.body);
        }
    }

    private ParseJsonResponse(result: HttpResponse<Object>): Promise<Object>
    {
        let tryBodyParse = this.TryBodyJsonParse(result.body);
        let resolvedBody: Object =
            tryBodyParse.HasFulfilled ? tryBodyParse.Result : result.body;
        return Promise.resolve(resolvedBody);
    }

    private TryBodyJsonParse(response: any): ITryResult<any>
    {
        let tryResult: ITryResult<any> = new TryResult<any>();
        try
        {
            tryResult.Result = JSON.parse(response);
            tryResult.HasFulfilled = true;
        }
        catch (ex)
        {
            tryResult.HasFulfilled = false;
        }
        return tryResult;
    }

    private OnRequestError(reason: HttpErrorResponse, webRequest: WebRequest): Promise<Object>
    {
        let errorBody = this.ParseError(reason, webRequest);
        let error = new AsyncErrorResult(errorBody, reason.status.toString());
        let errorPromise: Promise<Object> = Promise.reject(error);

        return errorPromise;
    }

    private ParseError(errorResponse: HttpErrorResponse, webRequest: WebRequest): any
    {
        let errorBody: any = null;
        if (webRequest.ResponseType != ResponseTypes.ArrayBuffer)
        {
            errorBody = errorResponse.error;
        }
        else
        {
            errorBody = `${errorResponse.statusText}: ${errorResponse.url}`;
        }
        return errorBody;
    }
}
