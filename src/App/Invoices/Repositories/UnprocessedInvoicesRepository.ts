import { Injectable } from "@angular/core";
import { RepositoryBase } from "../../../Common/Repositories/RepositoryBase";
import { WebRequestService } from "../../../Common/Services/WebRequests/WebRequestService";
import { AuthenticationService } from "../../../Common/Services/Authentication/AuthenticationService";
import { InvoicesAddressService } from "./InvoicesAddressService";

@Injectable()
export class UnprocessedInvoicesRepository extends RepositoryBase
{
    private addressService: InvoicesAddressService;

    public constructor(requestService: WebRequestService,
        addressService: InvoicesAddressService,
        authenticationService: AuthenticationService)
    {
        super(requestService, authenticationService);
        this.addressService = addressService;
    }

    public GetAsync(): Promise<any>
    {
        let address: string = this.addressService.GetFilesAddress();
        let promise: Promise<any> = this.RequestGetAsync<any>(address)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }

    public PostAsync(fileModel: any): Promise<Object>
    {
        let address: string = this.addressService.GetFilesAddress();
        let promise: Promise<Object> = this.RequestPostAsync(address, fileModel)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }

    public GenerateDownloadUrlAsync(fileId: string): Promise<Object>
    {
        let address: string = this.addressService.GenerateDownloadUrlAddress(fileId);
        let promise: Promise<Object> = this.RequestPostAsync(address, null)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }
}