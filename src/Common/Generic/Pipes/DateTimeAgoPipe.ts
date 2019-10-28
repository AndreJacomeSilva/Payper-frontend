
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dateTimeAgo",
    pure: true
})
export class DateTimeAgoPipe implements PipeTransform
{
    private readonly numberOfSecondsForJustNow: number = 29;
    private readonly secondsDivider = 1000;

    public transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / this.secondsDivider);
            if (seconds < this.numberOfSecondsForJustNow)
            {
                return "agora mesmo.";
            }
            const intervals = {
                "ano": 31536000,
                "mês": 2592000,
                "seamana": 604800,
                "dia": 86400,
                "hora": 3600,
                "minuto": 60,
                "segundo": 1
            };
            let counter;
            for (const i in intervals)
            {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                {
                    let dateTimeAgoString = "há " + counter + " " + i;
                    if (counter === 1)
                    {
                        return dateTimeAgoString + "."; // singular (1 day ago)
                    }
                    else
                    {
                        return dateTimeAgoString + "s."; // plural (2 days ago)
                    }
                }
            }
        }
        return value;
    }
}