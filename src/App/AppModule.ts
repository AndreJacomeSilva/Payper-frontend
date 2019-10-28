import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt-PT";
import { ApplicationInsightsModule, AppInsightsService } from "@markpieszak/ng-application-insights";
import { FileUploadModule } from "primeng/fileupload";
import { CarouselModule } from "primeng/carousel";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import {TabMenuModule} from "primeng/tabmenu";
import {TooltipModule} from "primeng/tooltip";

import { AppRoutingModule } from "./AppRoutingModule";
import { AppComponent } from "./AppComponent";
import { Environment } from "../Environments/Environment";
import { AuthenticationService } from "../Common/Services/Authentication/AuthenticationService";
import { LocalStorageService as LocalStorageServiceBase } from "../Common/Services/Storage/Bases/LocalStorageService";
import { LocalStorageService } from "../Common/Services/Storage/LocalStorageService";
import { PermanentStorageService as PermanentStorageServiceBase }
    from "../Common/Services/Storage/Bases/PermanentStorageService";
import { PermanentStorageService } from "../Common/Services/Storage/PermanentStorageService";
import { HomeComponent } from "./Home/HomeComponent";
import { UploadComponent } from "./Upload/UploadComponent";
import { DashboardComponent } from "./Dashboard/DashboardComponent";
import { StringExtensions } from "../Common/Generic/Extensions/StringExtensions";
import { GoToTopComponent } from "../Common/Components/GoToTop/GoToTopComponent";
import { AuthenticationGuardService } from "../Common/Services/Guards/AuthenticationGuardService";
import { CountdownComponent } from "../Common/Components/Countdown/CountdownComponent";
import { InvoicesComponent } from "./Invoices/InvoicesComponent";
import { UploadHelpComponent } from "./Upload/Help/UploadHelpComponent";
import { UploadDetailsComponent } from "./Upload/UploadDetails/UploadDetailsComponent";
import { ProcessedInvoicesComponent } from "./Invoices/ProcessedInvoices/ProcessedInvoicesComponent";
import { UnprocessedInvoicesComponent } from "./Invoices/UnprocessedInvoices/UnprocessedInvoicesComponent";
import { FileProcessingStatusCodeNamePipe } from "../Common/Generic/Pipes/FileProcessingStatusCodeNamePipe";
import { PrivacyComponent } from "./Privacy/PrivacyComponent";
import { UpdateToasterComponent } from "../Common/Components/UpdateToaster/UpdateToasterComponent";
import { DateTimeAgoPipe } from "../Common/Generic/Pipes/DateTimeAgoPipe";
import { WebRequestService } from "../Common/Services/WebRequests/WebRequestService";
import { ObjectExtensions } from "../Common/Generic/Extensions/ObjectExtensions";
import { ArrayExtensions } from "../Common/Generic/Extensions/ArrayExtensions";
import { UnprocessedInvoicesRepository } from "./Invoices/Repositories/UnprocessedInvoicesRepository";
import { ContractedServicesRepository } from "./ContractedService/Repositories/ContractedServicesRepository";
import { ProfileComponent } from "./Profile/ProfileComponent";
import { ProcessedInvoicesRepository } from "./Invoices/Repositories/ProcessedInvoicesRepository";
import { ContractedServiceComponent } from "./ContractedService/ContractedServiceComponent";
import { ComparisonComponent } from "./Comparison/ComparisonComponent";
import { AlertsComponent } from "./Alerts/AlertsComponent";
import { TranslateServiceTypePipe } from "../Common/Generic/Pipes/TranslateServiceTypePipe";
import { TranslateMultiRatePipe } from "../Common/Generic/Pipes/TranslateMultiRatePipe";
import { ProcessedInvoiceDetailComponent } from "./Invoices/ProcessedInvoices/Detail/ProcessedInvoiceDetailComponent";
import { AlertboxComponent } from "../Common/Components/Alertbox/AlertboxComponent";

registerLocaleData(localePt, "pt-PT");

StringExtensions.Register();
ArrayExtensions.Register();
ObjectExtensions.Register();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    DashboardComponent,
    CountdownComponent,
    InvoicesComponent,
    UploadHelpComponent,
    UploadDetailsComponent,
    ProcessedInvoicesComponent,
    ProcessedInvoiceDetailComponent,
    UnprocessedInvoicesComponent,
    PrivacyComponent,
    ProfileComponent,
    ContractedServiceComponent,
    ComparisonComponent,
    AlertsComponent,
    GoToTopComponent,
    UpdateToasterComponent,
    AlertboxComponent,
    FileProcessingStatusCodeNamePipe,
    DateTimeAgoPipe,
    TranslateServiceTypePipe,
    TranslateMultiRatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: Environment.Production }),
    HttpClientModule,
    FileUploadModule,
    CarouselModule,
    AccordionModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    TabMenuModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ApplicationInsightsModule.forRoot({
        instrumentationKey: Environment.AppInsightsKey
      })
  ],
  providers: [
    AuthenticationService,
    WebRequestService,
    { provide: LocalStorageServiceBase, useClass: LocalStorageService },
    { provide: PermanentStorageServiceBase, useClass: PermanentStorageService },
    AppInsightsService,
    AuthenticationGuardService,
    { provide: LOCALE_ID, useValue: "pt-PT" },
    UnprocessedInvoicesRepository,
    ProcessedInvoicesRepository,
    ContractedServicesRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
