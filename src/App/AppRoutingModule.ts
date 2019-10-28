import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./Home/HomeComponent";
import { UploadComponent } from "./Upload/UploadComponent";
import { AuthenticationGuardService } from "../Common/Services/Guards/AuthenticationGuardService";
import { DashboardComponent } from "./Dashboard/DashboardComponent";
import { InvoicesComponent } from "./Invoices/InvoicesComponent";
import { UploadHelpComponent } from "./Upload/Help/UploadHelpComponent";
import { UploadDetailsComponent } from "./Upload/UploadDetails/UploadDetailsComponent";
import { ProcessedInvoicesComponent } from "./Invoices/ProcessedInvoices/ProcessedInvoicesComponent";
import { UnprocessedInvoicesComponent } from "./Invoices/UnprocessedInvoices/UnprocessedInvoicesComponent";
import { PrivacyComponent } from "./Privacy/PrivacyComponent";
import { ProfileComponent } from "./Profile/ProfileComponent";
import { ContractedServiceComponent } from "./ContractedService/ContractedServiceComponent";
import { ComparisonComponent } from "./Comparison/ComparisonComponent";
import { AlertsComponent } from "./Alerts/AlertsComponent";
import { ProcessedInvoiceDetailComponent } from './Invoices/ProcessedInvoices/Detail/ProcessedInvoiceDetailComponent';

const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent,
        data: { page: "home", depth: 1 }
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        data: { page: "dashboard", depth: 1 },
        canActivate: [AuthenticationGuardService]
    },
    {
        path: "upload",
        component: UploadComponent,
        data: { page: "upload", depth: 1 },
        children: [
            {
                path: "",
                redirectTo: "details",
                pathMatch: "full"
            },
            {
                path: "details",
                component: UploadDetailsComponent,
                data: { page: "uploadDetails", depth: 2 },
            },
            {
                path: "help",
                component: UploadHelpComponent,
                data: { page: "help", depth: 2 },
            }
        ]
    },
    {
        path: "invoices",
        component: InvoicesComponent,
        data: { page: "invoices", depth: 1 },
        canActivate: [AuthenticationGuardService],
        children: [
            {
                path: "",
                redirectTo: "processed",
                pathMatch: "full"
            },
            {
                path: "processed",
                component: ProcessedInvoicesComponent,
                data: { page: "processed", depth: 2 },
            },
            {
                path: "unprocessed",
                component: UnprocessedInvoicesComponent,
                data: { page: "unprocessed", depth: 2 },
            }
        ]
    },
    {
        path: "invoices/processed-detail/:id",
        component: ProcessedInvoiceDetailComponent,
        canActivate: [AuthenticationGuardService],
        data: { page: "processed-detail", depth: 1 },
    },
    {
        path: "profile",
        component: ProfileComponent,
        data: { page: "profile", depth: 1},
        canActivate: [AuthenticationGuardService]
    },
    {
        path: "contracted-service/:id",
        component: ContractedServiceComponent,
        data: { animation: "contracted-service", depth: 1 },
        canActivate: [AuthenticationGuardService]
    },
    {
        path: "comparison",
        component: ComparisonComponent,
        data: { animation: "comparison", depth: 1 },
        canActivate: [AuthenticationGuardService]
    },
    {
        path: "alerts",
        component: AlertsComponent,
        data: { animation: "alerts", depth: 1 },
        canActivate: [AuthenticationGuardService]
    },
    {
        path: "privacy",
        component: PrivacyComponent,
        data: { page: "privacy", depth: 1}
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled",
    preloadingStrategy: PreloadAllModules,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
