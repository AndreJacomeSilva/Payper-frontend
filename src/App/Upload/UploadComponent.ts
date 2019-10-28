import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routerTransition } from "../AppRouteAnimations";

@Component({
  selector: "upload",
  templateUrl: "./UploadComponent.html",
  styleUrls: ["./UploadComponent.scss"],
  animations: [routerTransition]
})
export class UploadComponent implements OnInit {
    public constructor() { }

    public ngOnInit() {
    }
}
