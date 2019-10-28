import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../Common/Services/Authentication/AuthenticationService";
import { AuthUser } from "../../Common/Generic/Models/AuthUser";
import { ContractedServicesRepository } from "../ContractedService/Repositories/ContractedServicesRepository";
import { ContractedServiceUI } from "../ContractedService/Models/ContractedServiceUI";

@Component({
  selector: "profile",
  templateUrl: "./ProfileComponent.html",
  styleUrls: ["./ProfileComponent.scss"]
})
export class ProfileComponent implements OnInit {

    private authenticationService: AuthenticationService;
    private contractedServicesRepository: ContractedServicesRepository;

    public User: AuthUser;
    public ContractedServices = [];
    public TooltipText: string = "Copiar";

    public constructor(authenticationService: AuthenticationService,
        contractedServicesRepository: ContractedServicesRepository)
    {
        this.authenticationService = authenticationService;
        this.contractedServicesRepository = contractedServicesRepository;
    }

    public ngOnInit()
    {
        this.User = this.authenticationService.GetUser();
        this.GetContractedServices();
    }

    private GetContractedServices()
    {
        this.contractedServicesRepository.GetAsync()
            .then((res) => {
                this.ContractedServices = this.MapContractedServices(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private MapContractedServices(services: any)
    {
        let result = [];

        for (let service of services)
        {
            let mappedService = this.MapContractedServiceToUI(service);
            result.push(mappedService);
        }

        return result;
    }

    public MapContractedServiceToUI(contractedService: any): ContractedServiceUI
    {
        let serviceUI: ContractedServiceUI = new ContractedServiceUI();
        serviceUI.Id = contractedService.Id;
        serviceUI.Type = contractedService.ServiceType;
        serviceUI.Endpoint = contractedService.EndpointId;
        serviceUI.Address = contractedService.Address;
        serviceUI.CustomerName = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.BillingCustomer.Name;
        serviceUI.CustomerVAT = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.BillingCustomer.VatNumber;
        serviceUI.Supplier = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.ServiceProvider.Name;
        serviceUI.ElectricityPower = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.ContractedPower;
        return serviceUI;
    }

    public CopyTextToClipboard(val: string)
    {
        const selBox = document.createElement("textarea");
        selBox.style.position = "fixed";
        selBox.style.left = "0";
        selBox.style.top = "0";
        selBox.style.opacity = "0";
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand("copy");
        document.body.removeChild(selBox);
        this.TooltipText = "Copiado!";

        setTimeout(() => { this.TooltipText = "Copiar"; }, 1000);
    }

    public Logout()
    {
        this.authenticationService.Logout();
    }
}
