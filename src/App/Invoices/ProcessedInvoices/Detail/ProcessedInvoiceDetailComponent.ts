import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UnprocessedInvoicesRepository } from "../../Repositories/UnprocessedInvoicesRepository";

@Component({
  selector: "processed-invoice",
  templateUrl: "./ProcessedInvoiceDetailComponent.html",
  styleUrls: ["./ProcessedInvoiceDetailComponent.scss"]
})
export class ProcessedInvoiceDetailComponent implements OnInit
{
    private unprocessedInvoicesRepository: UnprocessedInvoicesRepository;

    public Invoice: any;

    public constructor(private router: Router,
        unprocessedInvoicesRepository: UnprocessedInvoicesRepository)
    {
        this.unprocessedInvoicesRepository = unprocessedInvoicesRepository;
        try
        {
            let invoices = JSON.parse(history.state.invoice);
            this.Invoice = invoices.FirstOrDefault();
        }
        catch (error)
        {
            this.router.navigate(["invoices"]);
        }
    }

    public ngOnInit()
    {
    }

    public DownloadFile()
    {
        this.unprocessedInvoicesRepository.GenerateDownloadUrlAsync(this.Invoice.FileId)
        .then((result: any) => {
            window.open(result.DownloadUrl, "_blank");
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
