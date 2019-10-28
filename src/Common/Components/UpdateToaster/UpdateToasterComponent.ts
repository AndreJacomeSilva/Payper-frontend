import { Component, Input } from "@angular/core";

@Component({
  selector: "app-toaster",
  templateUrl: "./UpdateToasterComponent.html",
  styleUrls: [ "./UpdateToasterComponent.scss" ]
})
export class UpdateToasterComponent {
  @Input() show = false;

  public reload() {
    document.location.reload();
  }
}