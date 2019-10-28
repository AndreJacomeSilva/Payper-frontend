import { Injectable } from "@angular/core";

import * as Msal from "msal";
import { AuthUser } from "../../Generic/Models/AuthUser";
import { BehaviorSubject } from "rxjs";
import { Environment } from "../../../Environments/Environment";
import { AccessTokenData } from "./Models/AccessTokenData";
import { IdToken } from "msal/lib-commonjs/IdToken";
import { PermanentStorageService } from "../Storage/Bases/PermanentStorageService";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
  })
export class AuthenticationService
{
    private readonly idTokenCodeName: string = "idToken";
    private readonly passwordRecoveryErrorCode: string = "AADB2C90118";
    private readonly uploadRoute: string = "/upload";
    private readonly dashboardRoute: string = "/dashboard";

    private userChangeSubject = new BehaviorSubject(new AuthUser());
    private permanentStorageService: PermanentStorageService;
    private b2cScopes = Environment.B2cScopes;
    private tenantConfig = Environment.TenantConfig;
    private signInAuthority: string =
        Environment.B2cLoginUrl + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy + "/";
    private recoveryAuthority: string =
        Environment.B2cLoginUrl + this.tenantConfig.tenant + "/" + this.tenantConfig.passwordRecovery + "/";

    private msalConfig: Msal.Configuration = {
        auth: {
            clientId: this.tenantConfig.clientID,
            authority: this.signInAuthority,
            navigateToLoginRequestUrl: false,
            validateAuthority: false,
            redirectUri: this.tenantConfig.redirectUri,
            postLogoutRedirectUri: this.tenantConfig.redirectUri
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true,
        }
    };
    private clientApplication: Msal.UserAgentApplication = new Msal.UserAgentApplication(this.msalConfig);

    public constructor(
        permanentStorageService: PermanentStorageService,
        private route: Router)
    {
        this.permanentStorageService = permanentStorageService;
        this.clientApplication.handleRedirectCallback(this.SuccessRedirectCallback, this.ErrorRedirectCallback);
        if (this.IsAuthenticated()) {
            this.userChangeSubject.next(this.GetUser());
        }
    }

    public IsAuthenticated(): boolean
    {
        if (this.clientApplication === undefined || this.clientApplication === null) {
            return false;
        }

        const account: Msal.Account = this.clientApplication.getAccount();
        const millisecondsConversionInt = 1000;
        if (account && account.idToken && account.idToken.exp) {
            const expirationInMilliseconds: number = +account.idToken.exp * millisecondsConversionInt;
            const timeRightNowInMilliseconds = new Date().getTime();
            return expirationInMilliseconds > timeRightNowInMilliseconds;
        }

        // If the account doesn"t exist or we can"t acesss the idToken, the user is either NOT logged on
        return false;
    }

    public IsLoginInProgress(): boolean
    {
        return this.clientApplication.getLoginInProgress();
    }

    public GetTokenExpirationDate(): Date
    {
        const account: Msal.Account = this.clientApplication.getAccount();
        const millisecondsConversionInt = 1000;
        if (account && account.idToken && account.idToken.exp) {
            const expirationInMilliseconds: number = +account.idToken.exp * millisecondsConversionInt;
            return new Date(expirationInMilliseconds);
        }
        return new Date(0);
    }

    public GetUser(): AuthUser
    {
        const user = new AuthUser();
        let account: Msal.Account;
        if (this.clientApplication) {
            account = this.clientApplication.getAccount();
        }

        if (account && account.idToken) {
            if (account.idToken.emails && account.idToken.emails.length > 0) {
                user.Email = account.idToken.emails[0];
            }
            user.Name = account.idToken.name;
            user.Id = account.idToken.sub;
        }

        return user;
    }

    public Login(): void
    {
        const account: Msal.Account = this.clientApplication.getAccount();

        if (account) {
            // User is already logged in ...attempt silent token acquisition
            this.GetTokenSilently();
        } else {
            // User is not logged in, you will need to log them in to acquire a token
            this.GetTokenViaLoginRedirect();
        }
    }

    public LoginRedirectToUpload(): void
    {
        const account: Msal.Account = this.clientApplication.getAccount();

        if (account) {
            // User is already logged in ...attempt silent token acquisition
            this.GetTokenSilently(this.uploadRoute);
        } else {
            // User is not logged in, you will need to log them in to acquire a token
            this.GetTokenViaLoginRedirect(this.uploadRoute);
        }
    }

    public Logout(): void
    {
        this.clientApplication.logout();
        this.permanentStorageService.Clear();
    }

    private GetTokenSilently(redirectUrl?: string)
    {
        const tokenRequest: Msal.AuthenticationParameters = { scopes: this.b2cScopes };

        this.clientApplication.acquireTokenSilent(tokenRequest)
            .then(response => {this.OnGetTokenSilentlySucceeded(response, redirectUrl); })
            .catch(reason => {this.OnGetTokenSilentlyFailed(reason, tokenRequest); });
    }

    public OnGetTokenSilentlySucceeded = (response: Msal.AuthResponse, redirectUrl?: string) =>
    {
        if (!this.IsAuthenticated())
        {
            this.permanentStorageService.Clear();
            this.clientApplication = new Msal.UserAgentApplication(this.msalConfig);
            this.clientApplication.handleRedirectCallback(this.SuccessRedirectCallback, this.ErrorRedirectCallback);
            this.GetTokenViaLoginRedirect();
        }
        else
        {
            this.permanentStorageService.SetValue(this.idTokenCodeName, response.idToken);
            this.userChangeSubject.next(this.GetUser());
            if (redirectUrl == null)
            {
                redirectUrl = this.dashboardRoute;
            }
            this.route.navigate([redirectUrl]);
        }
    }

    private OnGetTokenSilentlyFailed = (reason: any, tokenRequest: Msal.AuthenticationParameters) =>
    {
        if (reason instanceof Msal.InteractionRequiredAuthError) {
            this.clientApplication.acquireTokenRedirect(tokenRequest);
        }
    }

    private SuccessRedirectCallback = (response: Msal.AuthResponse) =>
    {
        this.permanentStorageService.SetValue(this.idTokenCodeName, response.idToken);
        if (response.accessToken) {
            console.log("Auth: redirectCallback called with response AND an access token.", response);
        } else {
            console.log("Auth: redirectCallback called with response WITHOUT an access token.", response);
        }
        if (response.accountState == this.uploadRoute)
        {
            this.route.navigate([this.uploadRoute]);
        }
    }

    private ErrorRedirectCallback = (authErr: Msal.AuthError, accountState: string)  =>
    {
        if (authErr.errorMessage.indexOf(this.passwordRecoveryErrorCode) > -1) {
            this.clientApplication.authority = this.recoveryAuthority;
            this.GetTokenViaLoginRedirect();
        }
    }

    private GetTokenViaLoginRedirect(redirectRoute?: string)
    {
        const tokenRequest: Msal.AuthenticationParameters = { scopes: this.b2cScopes };
        tokenRequest.state = redirectRoute;
        console.log(tokenRequest);
        this.clientApplication.loginRedirect(tokenRequest);
    }

    public GetToken()
    {
        return this.permanentStorageService.GetValue<IdToken>(this.idTokenCodeName).rawIdToken;
    }
}
