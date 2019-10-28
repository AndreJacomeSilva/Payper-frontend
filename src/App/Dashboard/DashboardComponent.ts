import { Component, OnInit, NgZone } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";
import { UnprocessedInvoicesRepository } from "../Invoices/Repositories/UnprocessedInvoicesRepository";
import { FileProcessingStatuses } from "../Invoices/Models/FileProcessingStatuses";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ContractedServicesRepository } from "../ContractedService/Repositories/ContractedServicesRepository";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "dashboard",
  templateUrl: "./DashboardComponent.html",
  styleUrls: ["./DashboardComponent.scss"],
  animations: [
    trigger(
      "enterAnimation", [
        transition(":enter", [
          style({transform: "translateX(100%)", opacity: 0}),
          animate("500ms", style({transform: "translateX(0)", opacity: 1}))
        ]),
        transition(":leave", [
          style({transform: "translateX(0)", opacity: 1}),
          animate("500ms", style({transform: "translateX(100%)", opacity: 0}))
        ])
      ]
    )
  ],
})
export class DashboardComponent implements OnInit
{
    private unprocessedInvoicesRepository: UnprocessedInvoicesRepository;
    private contractedServicesRepository: ContractedServicesRepository;

    private readonly decimalPlaces: number = 2;
    private readonly estimatedTimeToProcessInMinutes: number = 5;
    private readonly minutesDivider: number = 60000;
    private chart: am4charts.XYChart;
    private ContractedServicesMockData = [{
        "Id": "ed0bacdb-74ba-4575-8f36-bf2df07802a6",
        "UserId": "279c21db-978c-4212-b3dc-392616d0b775",
        "EndpointId": "PT0002000120273303MG",
        "ServiceType": "Electricity",
        "CreationDate": "2019-10-08T18:35:45.2300651+01:00",
        "Consumption": null,
        "Address": {
            "Line": "RUA DO CAVACO , 96 2 DT",
            "ZipCode": "4400-492",
            "CityName": "Vila Nova de Gaia",
            "StateName": "Porto",
            "CountryName": "Portugal",
            "Id": "ed0bacdb-74ba-4575-8f36-bf2df07802a6"
        }
    }, {
        "Id": "ed0bacdb-74ba-4575-8f36-bf2df07802a4",
        "UserId": "279c21db-978c-4212-b3dc-392616d0b775",
        "EndpointId": "PT0002000120273303MG",
        "ServiceType": "Gas",
        "CreationDate": "2019-10-08T18:35:45.2300651+01:00",
        "Consumption": null,
        "Address": {
            "Line": "CAIS DO LUGAN 224, 2 DT",
            "ZipCode": "4400-492",
            "CityName": "Vila Nova de Gaia",
            "StateName": "Porto",
            "CountryName": "Portugal",
            "Id": "ed0bacdb-74ba-4575-8f36-bf2df07802a4"
        }
    }];
    private ComparisonServicesMockData = [
        {
            Id: "ed0bacdb-74ba-4575-8f36-bf2df07802a6",
            ChartData: [{
                "category": "Mais económico\n600",
                "value": 600
            }, {
                "category": "Tarifário Actual\n1650",
                "value": 1650
            }]
        },
        {
            Id: "ed0bacdb-74ba-4575-8f36-bf2df07802a4",
            ChartData: [{
                "category": "Mais económico\n600",
                "value": 600
            }, {
                "category": "Tarifário Actual\n1250",
                "value": 1250
            }]
        }
    ];

    public IsToShowProcessingInvoices: boolean;
    public LatestUnprocessedInvoice;
    public EstimatedTimeToProcessInMinutes: number;
    public ActiveTab: string = "ed0bacdb-74ba-4575-8f36-bf2df07802a6";
    public ContractedServices = [];
    public ComparisonServicesData = [];
    public IsShowingMockData: boolean;

    public constructor(unprocessedInvoicesRepository: UnprocessedInvoicesRepository,
        contractedServicesRepository: ContractedServicesRepository,
        private zone: NgZone)
    {
        this.unprocessedInvoicesRepository = unprocessedInvoicesRepository;
        this.contractedServicesRepository = contractedServicesRepository;
        this.GetUnprocessedInvoices();
        this.GetContractedServices();
    }

    public ngOnInit()
    {
    }

    public ngAfterViewInit()
    {
    }

    public ngOnDestroy()
    {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    private CreateChart(serviceId: string) {
        this.chart = this.createChart("chart-" + serviceId,
            this.ComparisonServicesData.Where(
                (serviceData) => serviceData.Id == serviceId).FirstOrDefault().ChartData);
    }

    private createChart(chartName: string, chartData: any): am4charts.XYChart
    {
        let chart = am4core.create(chartName, am4charts.XYChart);
        chart.colors.list = [
            am4core.color("#33C3D5"),
            am4core.color("#323A45")
          ];
        // Add data
        chart.data = chartData;
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.opposite = true;
        categoryAxis.renderer.grid.template.disabled = true;
        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "value";
        series.dataFields.categoryY = "category";
        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });
        return chart;
    }

    private GetContractedServices()
    {
        this.contractedServicesRepository.GetAsync()
        .then((res) => {
            this.ContractedServices = res;
            this.ActiveTab = this.ContractedServices[0].Id;
            for (let service of this.ContractedServices)
            {
                this.contractedServicesRepository.GetComparisonByContractedServiceAsync(service.Id)
                .then((simulations) => {
                    this.ComparisonServicesData = this.MapSimulationsToComparisonServicesData(simulations, service);
                    this.CreateChart(service.Id);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        })
        .catch(() => {
            this.ContractedServices = this.ContractedServicesMockData;
            this.IsShowingMockData = true;
            this.ComparisonServicesData = this.ComparisonServicesMockData;
            setTimeout(() => {
                this.CreateChart(this.ContractedServices[0].Id);
            }, 0);
        });
    }

    private MapSimulationsToComparisonServicesData(simulations, service)
    {
        let result = [];

        result.push({
            Id: simulations.FirstOrDefault().ContractedServiceId,
            ChartData: [{
                    "category": "Mais económico\n"
                        + simulations.FirstOrDefault().UntaxedYearlySaving.toFixed(this.decimalPlaces)
                        + "€ (poupança anual)",
                    "value": simulations.FirstOrDefault().UntaxedYearlyCost
                },
                {
                    "category": "Tarifário Actual\n"
                        + service.Consumption.UntaxedYearlyCost.toFixed(this.decimalPlaces)
                        + "€ (custo anual)*",
                    "value": service.Consumption.UntaxedYearlyCost
                }]
        });

        return result;
    }

    private GetUnprocessedInvoices()
    {
        this.IsToShowProcessingInvoices = false;
        this.unprocessedInvoicesRepository.GetAsync()
            .then((res) => {
                this.ShowUnprocessedInvoicesToastIfNeeded(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private ShowUnprocessedInvoicesToastIfNeeded(res: any)
    {
        if (res.length > 0) {
            if (res[0].FileProcessingStatus != FileProcessingStatuses.TimedOut &&
                res[0].FileProcessingStatus != FileProcessingStatuses.Error) {
                this.IsToShowProcessingInvoices = true;
                this.LatestUnprocessedInvoice = res[0];
                this.CalculateEstimatedTimeToProcessOrHideProcessingInvoices
                    (new Date(this.LatestUnprocessedInvoice.UploadDate));
            }
        }
    }

    public CalculateEstimatedTimeToProcessOrHideProcessingInvoices(uploadDate: Date)
    {
        let maxEstimatedDateToProcess = new Date();
        maxEstimatedDateToProcess.setMinutes(uploadDate.getMinutes() + this.estimatedTimeToProcessInMinutes);
        let timeDiff = maxEstimatedDateToProcess.getTime() - Date.now();
        if (timeDiff < 1 )
        {
            this.IsToShowProcessingInvoices = false;
        }
        else
        {
            if (Math.round((timeDiff)/(1000*60*60*24)) < 1 )
            {
                this.EstimatedTimeToProcessInMinutes = Math.round(timeDiff / this.minutesDivider);
            }
            else
            {
                this.IsToShowProcessingInvoices = false;
            }
        }
    }

    public CloseProcessingInvoices()
    {
        this.IsToShowProcessingInvoices = false;
    }

    public SetActiveTab(activeTab)
    {
        this.ActiveTab = activeTab;
        if (this.chart) {
            this.chart.dispose();
        }
        this.chart = this.createChart("chart-" + activeTab,
            this.ComparisonServicesData.Where((serviceData) => serviceData.Id == activeTab).FirstOrDefault().ChartData);
    }

}
