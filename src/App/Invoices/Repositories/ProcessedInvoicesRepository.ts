import { Injectable } from "@angular/core";
import { RepositoryBase } from "../../../Common/Repositories/RepositoryBase";
import { WebRequestService } from "../../../Common/Services/WebRequests/WebRequestService";
import { AuthenticationService } from "../../../Common/Services/Authentication/AuthenticationService";
import { InvoicesAddressService } from "./InvoicesAddressService";

@Injectable()
export class ProcessedInvoicesRepository extends RepositoryBase
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
        let address: string = this.addressService.GetInvoicesAddress();
        let promise: Promise<any> = this.RequestGetAsync<any>(address)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }
}