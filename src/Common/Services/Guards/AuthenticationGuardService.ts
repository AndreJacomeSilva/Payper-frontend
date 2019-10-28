import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "../Authentication/AuthenticationService";

@Injectable()
export class AuthenticationGuardService
{
    private authenticationService: AuthenticationService;
    private router: Router;
    private homeRouteUrl: string = "/home";

    public constructor(
        authenticationService: AuthenticationService,
        router: Router)
    {
        this.authenticationService = authenticationService;
        this.router = router;
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
    {
        return this.canActivate(route, state);
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
    {
        let url = state.url;
        return this.ValidateLogin(url);
    }

    private ValidateLogin(url: string): Promise<boolean>
    {
        return this.AuthenticateIfPossible()
            .then(result =>
            {
                return true;
            })
            .catch(error =>
            {
                this.router.navigate([this.homeRouteUrl]);
                return false;
            });
    }

    private AuthenticateIfPossible(): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            this.CheckUserAuthenticationAndRequiredInfo(resolve, reject);
        });
    }

    private CheckUserAuthenticationAndRequiredInfo(resolveAction: () => void, rejectAction: () => void): void
    {
        let isUserAuthenticated: boolean = this.authenticationService.IsAuthenticated();
        if (isUserAuthenticated)
        {
            resolveAction();
        }
        else
        {
            rejectAction();
        }
    }
}