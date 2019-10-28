declare interface ITryResult<TResult>
{
    HasFulfilled: boolean;
    Result: TResult;
}