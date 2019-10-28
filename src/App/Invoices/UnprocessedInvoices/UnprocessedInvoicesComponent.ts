import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UnprocessedInvoicesRepository } from "../Repositories/UnprocessedInvoicesRepository";
import { FileProcessingStatuses } from '../Models/FileProcessingStatuses';

@Component({
  selector: "unprocessed-invoices",
  templateUrl: "./UnprocessedInvoicesComponent.html",
  styleUrls: ["./UnprocessedInvoicesComponent.scss"]
})
export class UnprocessedInvoicesComponent implements OnInit
{
    private unprocessedInvoicesRepository: UnprocessedInvoicesRepository;

    public Invoices = [];

    public TableColumns = [
            { field: "OriginalName", header: "Ficheiro"},
            { field: "UploadDate", header: "Data Envio"},
            { field: "StatusCodeName", header: "Estado"}
        ];

    public constructor(unprocessedInvoicesRepository: UnprocessedInvoicesRepository)
    {
        this.unprocessedInvoicesRepository = unprocessedInvoicesRepository;
        this.GetUnprocessedInvoices();
    }

    public ngOnInit()
    {
    }

    private GetUnprocessedInvoices()
    {
        this.unprocessedInvoicesRepository.GetAsync()
            .then((res) => {
                this.Invoices = res.
                    Where((invoice) => invoice.FileProcessingStatus != FileProcessingStatuses.InvoiceGenerated);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
