import { Injectable } from "@angular/core";
import { Environment } from "../../../Environments/Environment";

@Injectable({
    providedIn: "root",
  })
export class ContractedServicesAddressService
{
    private serverUrl: string;

    public constructor()
    {
        this.serverUrl = Environment.ApiUrl;
    }

    public GetContractedServicesAddress(): string
    {
        return this.GetContractedServicesBaseAddress();
    }

    public GetContractedServiceByIdAddress(serviceId: string): string
    {
        return this.GetContractedServiceComparisonBaseAddress() + "/(" + serviceId + ")";
    }

    public GetContractedServiceComparisonAddress(serviceId: string): string
    {
        return this.GetContractedServiceComparisonBaseAddress() + "/(" + serviceId + ")/cost-plan-simulations";
    }

    private GetContractedServicesBaseAddress(): string
    {
        return this.serverUrl + "api/contracted-services";
    }

    private GetContractedServiceComparisonBaseAddress(): string
    {
        return this.serverUrl + "api/contracted-services";
    }
}