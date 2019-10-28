import { Pipe } from "@angular/core";

@Pipe({
    name: "translateServiceTypePipe"
})
export class TranslateServiceTypePipe
{
    public transform(value: string)
    {
        if (value != undefined)
        {
            let val: string = value.toString();
            switch (value)
            {
                case "Electricity":
                    val = "Eletricidade";
                    break;
                case "Gas":
                    val = "Gás";
                    break;
                case "Water":
                    val = "Água";
                    break;
                case "Telecommunications":
                    val = "Telecomunicações";
                    break;
                case "Insurances":
                    val = "Seguros";
                    break;
            }
            return val;
        }
    }
}