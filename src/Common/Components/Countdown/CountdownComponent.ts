import { HostListener, Component, Input } from "@angular/core";

@Component({
    selector: "countdown",
    templateUrl: "./CountdownComponent.html",
    styleUrls: ["./CountdownComponent.scss"]
  })
export class CountdownComponent
{
    private futureDate: Date;

    @Input("Date")
    public Date: string;
    public CountdownText: string;

    public constructor()
    {
        setInterval(() => {
            this.futureDate = new Date(this.Date);
            let diff = Math.floor (this.futureDate.getTime() - new Date().getTime()) / 1000;
            this.CountdownText = this.ConvertDateToDaysMinutesHoursSeconds(diff);
        }, 1000);
    }

    private ConvertDateToDaysMinutesHoursSeconds(diff: number): string
    {
        let days = Math.floor(diff / 86400);
        diff -= days * 86400;
        let hours = Math.floor(diff / 3600) % 24;
        diff -= hours * 3600;
        let minutes = Math.floor(diff / 60) % 60;
        diff -= minutes * 60;
        let seconds =  Math.floor(diff % 60);
        return [ days + "d", hours + "h", minutes + "m", seconds + "s" ].join(" ");
    }
}