export class AccessTokenData
{
    public idToken: string;
    public RefreshToken: string;
    public ExpirationDate: Date;
    public UserId: string;

    public constructor(token?: string, refreshToken?: string, expirationDate?: Date, userId?: string)
    {
        this.idToken = token;
        this.RefreshToken = refreshToken;
        this.ExpirationDate = expirationDate;
        this.UserId = userId;
    }
}