import { ITryResult } from "./ITryResult";

export class TryResult<TResult> implements ITryResult<TResult>
{
    public HasFulfilled: boolean = null;
    public Result: TResult = null;

    public constructor()
    {
    }
}

