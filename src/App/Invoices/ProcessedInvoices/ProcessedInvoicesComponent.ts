import { Component, OnInit } from "@angular/core";
import { ProcessedInvoicesRepository } from "../Repositories/ProcessedInvoicesRepository";
import { Router } from "@angular/router";

@Component({
  selector: "processed-invoices",
  templateUrl: "./ProcessedInvoicesComponent.html",
  styleUrls: ["./ProcessedInvoicesComponent.scss"]
})
export class ProcessedInvoicesComponent implements OnInit
{
    private processedInvoicesRepository: ProcessedInvoicesRepository;
    private router: Router;
    private origialInvoices: [];

    public InvoicesMockData = [
        {
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },
    {
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },
    {
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "luzboa",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    },{
        "Date": "2019-08-18T01:00:00+01:00",
        "FileId": "9df12e88-793b-4886-96e7-441088c50310",
        "Type": "Electricity",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "kuon",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "b51fb2b5-4eff-4457-b04c-b93318ea13b3"
    },
    {
        "Date": "2019-07-18T01:00:00+01:00",
        "FileId": "9e8b18f9-2942-4769-8efe-38cf06a6c371",
        "Type": "Gas",
        "Cost": 239.7,
        "TaxesCost": 59.74,
        "TotalCost": 299.44,
        "AccumulatedMeteringValues": [
            {
                "Date": "2019-08-18T01:00:00+01:00",
                "TotalAccumulatedValue": 35752.0,
                "NormalRateAccumulatedValue": 7443.0,
                "EconomicRateAccumulatedValue": 18828.0,
                "SuperEconomicRateAccumulatedValue": 9481.0,
                "IsRealReading": false,
                "Id": "c19cfff3-4736-441a-a154-b7420a5f92f8"
            },
            {
                "Date": "2019-04-01T01:00:00+01:00",
                "TotalAccumulatedValue": 29960.0,
                "NormalRateAccumulatedValue": 6248.0,
                "EconomicRateAccumulatedValue": 15871.0,
                "SuperEconomicRateAccumulatedValue": 7841.0,
                "IsRealReading": true,
                "Id": "6f20ed01-2674-496e-b7ff-be14d80bfd6c"
            }
        ],
        "ContractedCostPlan": {
            "CustomerType": "Business",
            "ElectricityPower": 17.25,
            "ElectricityMultiRateType": "TriHourly",
            "ElectricityCycleCodeName": "Daily",
            "ElectricityNormalRateCost": 0.2727,
            "ElectricityEconomicRateCost": 0.1566,
            "ElectricitySuperEconomicRateCost": 0.1035,
            "BillingCustomer": {
                "Vat": "506659879",
                "Name": "CENTRAL CASA D. DE PROJECTOS DE DOMOTICA LDA",
                "Address": {
                    "Line": "CAIS DO LUGAN , 224 2 DT",
                    "ZipCode": "4400-492",
                    "CityName": "VILA NOVA DE GAIA",
                    "StateName": "Porto",
                    "CountryName": "Portugal",
                    "Id": "c55bc2eb-8a76-4c34-82e1-9141068ab248"
                },
                "Id": "d40aaf93-01fe-4806-834c-09f34b198845"
            },
            "ServiceProvider": {
                "CodeName": "EDPC",
                "Name": "EDP Comercial",
                "WebsiteUrl": "edponline.edp.pt",
                "Id": "3d94afde-eb03-472e-a9d1-ac577f5526a9"
            },
            "Id": "a41ab9e9-5cfd-4b31-9466-804ea05bba9d"
        },
        "Id": "58aaff42-3ee1-4169-ba4c-d66540d3a617"
    }
    ];

    public Invoices: [];

    public Providers = [
            { label: "Todos", value: null },
            { label: "Edp", value: "edp" },
            { label: "Kuon", value: "kuon" },
            { label: "Endesa", value: "endesa" },
            { label: "Galp", value: "galp" },
            { label: "Gold Energy", value: "goldenergy" }
        ];

    public Services = [
        { label: "Eletricidade", value: "electricity" },
        { label: "Gás", value: "gas" }
    ];

    public TableColumns = [
            { field: "Type", header: "", width: "10%" },
            { field: "Supplier", header: "Fornecedor", width: "30%" },
            { field: "Date", header: "Data", width: "30%" },
            { field: "Total", header: "Total", width: "30%" }
        ];

    public TotalFilter: number;
    public IsShowingMockData: boolean;
    public TotalTimeout: any;

    public constructor(processedInvoicesRepository: ProcessedInvoicesRepository,
                       router: Router)
    {
        this.processedInvoicesRepository = processedInvoicesRepository;
        this.router = router;
        this.GetProcessedInvoices();
    }

    public ngOnInit()
    {
    }

    private GetProcessedInvoices()
    {
        this.processedInvoicesRepository.GetAsync()
            .then((res) => {
                this.origialInvoices = res;
                this.Invoices = this.MapInvoicesToTableData(res);
            })
            .catch((error) => {
                console.log(error);
                this.IsShowingMockData = true;
                this.Invoices = this.MapInvoicesToTableData(this.InvoicesMockData);
            });
    }

    private MapInvoicesToTableData(res: any): any
    {
        let tableData = [];

        for (let invoice of res)
        {
            let inv = {
                Id: invoice.Id,
                Date: invoice.Date,
                Type: invoice.ServiceType,
                Total: invoice.TotalCost,
                Supplier: invoice.ContractedCostPlan.ServiceProvider.CodeName
            };
            tableData.push(inv);
        }
        return tableData;
    }

    public OnTotalChange(event, dt) {
        if (this.TotalTimeout) {
            clearTimeout(this.TotalTimeout);
        }

        this.TotalTimeout = setTimeout(() => {
            dt.filter(event.value, "total", "gt");
        }, 250);
    }

    public OpenInvoiceDetail(invoiceId: string)
    {
        this.router.navigate(["/invoices/processed-detail", invoiceId],
            { state:
                { invoice: JSON.stringify(this.origialInvoices.Where((invoice: any) => invoice.Id == invoiceId))
                }
            });
    }

}
