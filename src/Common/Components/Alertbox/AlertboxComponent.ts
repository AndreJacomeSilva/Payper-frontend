import { Component, Input } from "@angular/core";

@Component({
    selector: "alertbox",
    templateUrl: "./AlertboxComponent.html",
    styleUrls: ["./AlertboxComponent.scss"]
  })
export class AlertboxComponent
{
    @Input("Text")
    public Text: string;

    @Input("AlertType")
    public AlertType: string;

    public constructor()
    {
    }
}