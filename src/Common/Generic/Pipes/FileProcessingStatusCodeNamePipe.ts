import { Pipe } from "@angular/core";
import { FileProcessingStatuses } from "../../../App/Invoices/Models/FileProcessingStatuses";

@Pipe({
    name: "fileStatusCodeNames"
})
export class FileProcessingStatusCodeNamePipe
{
    public transform(value: FileProcessingStatuses)
    {
        if (value != undefined)
        {
            let val: string = value.toString();
            switch (value)
            {
                case FileProcessingStatuses.Error:
                case FileProcessingStatuses.TimedOut:
                    val = "Erro";
                    break;
                default:
                    val = "Em análise";
                    break;
            }
            return val;
        }
    }
}