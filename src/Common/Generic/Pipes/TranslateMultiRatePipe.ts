import { Pipe } from "@angular/core";

@Pipe({
    name: "translateMultiRatePipe"
})
export class TranslateMultiRatePipe
{
    public transform(value: string)
    {
        if (value != undefined)
        {
            let val: string = value;
            switch (value)
            {
                case "Simple":
                    val = "Simples";
                    break;
                case "BiHourly":
                    val = "Bi-Horário";
                    break;
                case "TriHourly":
                    val = "Tri-Horário";
                    break;
            }
            return val;
        }
    }
}