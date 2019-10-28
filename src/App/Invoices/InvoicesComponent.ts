import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "invoices",
  templateUrl: "./InvoicesComponent.html",
  styleUrls: ["./InvoicesComponent.scss"]
})
export class InvoicesComponent implements OnInit
{
    public TabItems = [
        {label: "Faturas", icon: "", link: "/invoices/processed"},
        {label: "Em análise", icon: "", link: "/invoices/unprocessed"}
    ];

    public constructor() { }

    public ngOnInit()
    {
    }

}
