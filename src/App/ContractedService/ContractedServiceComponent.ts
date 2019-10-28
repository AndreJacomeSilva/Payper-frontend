import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContractedServicesRepository } from "./Repositories/ContractedServicesRepository";
import { ContractedServiceUI } from "./Models/ContractedServiceUI";

@Component({
  selector: "contracted-service",
  templateUrl: "./ContractedServiceComponent.html",
  styleUrls: ["./ContractedServiceComponent.scss"]
})
export class ContractedServiceComponent implements OnInit
{
    private route: ActivatedRoute;
    private contractedServicesRepository: ContractedServicesRepository;

    public ContractedService: ContractedServiceUI;
    public RouteId: string;

    public constructor(route: ActivatedRoute,
                       contractedServicesRepository: ContractedServicesRepository)
    {
        this.route = route;
        this.contractedServicesRepository = contractedServicesRepository;
    }

    public ngOnInit()
    {
        this.RouteId = this.route.snapshot.params["id"];
        this.contractedServicesRepository.GetContractedServiceByIdAsync(this.RouteId)
        .then((res) => {
            this.ContractedService = this.MapContractedServiceToUI(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    public MapContractedServiceToUI(contractedService: any): ContractedServiceUI
    {
        let serviceUI: ContractedServiceUI = new ContractedServiceUI();
        serviceUI.Type = contractedService.ServiceType;
        serviceUI.Endpoint = contractedService.EndpointId;
        serviceUI.Address = contractedService.Address.Line;
        serviceUI.CustomerName = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.BillingCustomer.Name;
        serviceUI.CustomerVAT = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.BillingCustomer.Vat;
        serviceUI.Supplier = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.ServiceProvider.Name;
        serviceUI.ElectricityPower = contractedService.Invoices.FirstOrDefault().ContractedCostPlan.ContractedPower;
        return serviceUI;
    }
}