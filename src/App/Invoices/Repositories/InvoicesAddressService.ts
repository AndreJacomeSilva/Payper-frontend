import { Injectable } from "@angular/core";
import { Environment } from "../../../Environments/Environment";

@Injectable({
    providedIn: "root",
  })
export class InvoicesAddressService
{
    private serverUrl: string;

    public constructor()
    {
        this.serverUrl = Environment.ApiUrl;
    }

    public GetFilesAddress(): string
    {
        return this.GetFilesBaseAddress();
    }

    private GetFilesBaseAddress(): string
    {
        return this.serverUrl + "api/files";
    }

    public GetInvoicesAddress(): string
    {
        return this.GetInvoicesBaseAddress();
    }

    private GetInvoicesBaseAddress(): string
    {
        return this.serverUrl + "api/invoices";
    }

    public GenerateDownloadUrlAddress(fileId: string)
    {
        return this.GetFilesBaseAddress() + "/(" + fileId + ")" + "/generate-download-url";
    }
}