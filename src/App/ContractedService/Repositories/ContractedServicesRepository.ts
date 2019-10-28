import { Injectable } from "@angular/core";
import { RepositoryBase } from "../../../Common/Repositories/RepositoryBase";
import { WebRequestService } from "../../../Common/Services/WebRequests/WebRequestService";
import { AuthenticationService } from "../../../Common/Services/Authentication/AuthenticationService";
import { ContractedServicesAddressService } from "./ContractedServicesAddressService";

@Injectable()
export class ContractedServicesRepository extends RepositoryBase
{
    private addressService: ContractedServicesAddressService;

    public constructor(requestService: WebRequestService,
        addressService: ContractedServicesAddressService,
        authenticationService: AuthenticationService)
    {
        super(requestService, authenticationService);
        this.addressService = addressService;
    }

    public GetAsync(): Promise<any>
    {
        let address: string = this.addressService.GetContractedServicesAddress();
        let promise: Promise<any> = this.RequestGetAsync<any>(address)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }

    public GetComparisonByContractedServiceAsync(serviceId: string): Promise<any>
    {
        let address: string = this.addressService.GetContractedServiceComparisonAddress(serviceId);
        let promise: Promise<any> = this.RequestGetAsync<any>(address)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }

    public GetContractedServiceByIdAsync(serviceId: string): Promise<any>
    {
        let address: string = this.addressService.GetContractedServiceByIdAddress(serviceId);
        let promise: Promise<any> = this.RequestGetAsync<any>(address)
            .then((result) =>
            {
                return result;
            });

        return promise;
    }
}