import { Component, OnInit } from "@angular/core";
import { ContractedServicesRepository } from "../ContractedService/Repositories/ContractedServicesRepository";

@Component({
  selector: "comparison",
  templateUrl: "./ComparisonComponent.html",
  styleUrls: ["./ComparisonComponent.scss"]
})
export class ComparisonComponent implements OnInit
{
    private contractedServicesRepository: ContractedServicesRepository;

    public AvailableSimulations = [];
    public ActiveTab: string;
    public ContractedServices = [];
    public IsShowingMockData: boolean;

    public constructor(contractedServicesRepository: ContractedServicesRepository)
    {
        this.contractedServicesRepository = contractedServicesRepository;
    }

    public ngOnInit()
    {
        this.GetContractedServices();
    }

    private GetContractedServices()
    {
        this.contractedServicesRepository.GetAsync()
        .then((res) => {
            this.ContractedServices = res;
            if (this.ContractedServices.length >0 )
            {
                this.ActiveTab = this.ContractedServices[0].Id;
                this.contractedServicesRepository.GetComparisonByContractedServiceAsync(this.ActiveTab)
                .then((simulations) => {
                    this.AvailableSimulations = simulations;
                });
            }
        })
        .catch(() => {
        });
    }

    public SetActiveTab(activeTab)
    {
        this.ActiveTab = activeTab;
        this.contractedServicesRepository.GetComparisonByContractedServiceAsync(this.ActiveTab)
                .then((simulations) => {
                    this.AvailableSimulations = simulations;
                });
    }
}