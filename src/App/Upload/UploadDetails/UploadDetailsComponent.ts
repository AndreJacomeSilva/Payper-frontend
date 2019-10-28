import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { Environment } from "../../../Environments/Environment";
import { WebRequestService } from "../../../Common/Services/WebRequests/WebRequestService";
import { WebRequest } from "../../../Common/Services/WebRequests/Models/WebRequest";
import { WebRequestMethods } from "../../../Common/Services/WebRequests/Models/WebRequestMethods";

@Component({
  selector: "upload-details",
  templateUrl: "./UploadDetailsComponent.html",
  styleUrls: ["./UploadDetailsComponent.scss"]
})
export class UploadDetailsComponent implements OnInit {
    private webRequestService: WebRequestService;
    private elementRef: ElementRef;
    private renderer: Renderer2;

    public HasUploadedFileSuccess: boolean;
    public HasUploadedFileError: boolean;

    public constructor(webRequestService: WebRequestService,
        el: ElementRef, renderer: Renderer2)
    {
        this.webRequestService = webRequestService;
        this.elementRef = el;
        this.renderer = renderer;
    }

    public ngOnInit()
    {
    }

    public OnSubmitFileUpload(event)
    {
        const formData = new FormData();
        formData.append("file", event.files[0]);

        // TODO: move this code to Invoices Repository
        let request: WebRequest = new WebRequest(
            Environment.ApiUrl + "api/files", WebRequestMethods.Post);
        this.webRequestService.RequestAsync(request, formData)
            .then((res) => {
                this.HasUploadedFileSuccess = true;
                console.log("Sucesso: " + res);
            })
            .catch((error) => {
                this.HasUploadedFileError = true;
                console.log("Erro: " + error.Reason + " Codigo: " + error.StatusCode);
            });
    }

    public OnFileSelected(event)
    {
        let searchBox = this.elementRef.nativeElement.querySelector(".ui-fileupload.ui-widget.ng-star-inserted");
        this.renderer.setStyle(searchBox, "background-color", "#3a4352");
        let searchSpan = this.elementRef.nativeElement.querySelector(".ui-button-text-icon-left .ui-button-text");
        this.renderer.setStyle(searchSpan, "padding-top", "0");
        let uploadButton = this.elementRef.nativeElement.querySelector('p-button[icon="pi pi-upload"]');
        this.renderer.setStyle(uploadButton, "display", "inline-block");
        let cancelButton = this.elementRef.nativeElement.querySelector('p-button[icon="pi pi-times"]');
        this.renderer.setStyle(cancelButton, "display", "inline-block");
    }

    public OnFileRemoved(event)
    {
        let searchBox = this.elementRef.nativeElement.querySelector(".ui-fileupload.ui-widget.ng-star-inserted");
        this.renderer.setStyle(searchBox, "background-color", "#212933");
        let searchSpan = this.elementRef.nativeElement.querySelector(".ui-button-text-icon-left .ui-button-text");
        this.renderer.setStyle(searchSpan, "padding-top", "1.5em");
        let uploadButton = this.elementRef.nativeElement.querySelector('p-button[icon="pi pi-upload"]');
        this.renderer.setStyle(uploadButton, "display", "none");
        let cancelButton = this.elementRef.nativeElement.querySelector('p-button[icon="pi pi-times"]');
        this.renderer.setStyle(cancelButton, "display", "none");
    }


}
