import { ResponseTypes } from "./ResponseTypes";
import { WebRequestMethods } from "./WebRequestMethods";

export class WebRequest
{
    public Address: string;
    public RequestMethod: WebRequestMethods;
    public ResponseType: ResponseTypes;
    public ContentType: string;

    public constructor(address: string,
        requestMethod: WebRequestMethods,
        responseType: ResponseTypes = ResponseTypes.Json)
    {
        this.Address = address;
        this.RequestMethod = requestMethod;
        this.ResponseType = responseType;
    }
}