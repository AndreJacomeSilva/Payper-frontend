import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../Common/Services/Authentication/AuthenticationService";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";

import { filter } from "rxjs/operators";
import { routerTransition } from "./AppRouteAnimations";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./AppComponent.html",
  styleUrls: ["./AppComponent.scss"],
  animations: [routerTransition]
})
export class AppComponent implements OnInit
{
    private authenticationService: AuthenticationService;
    private router: Router;
    private serviceWorkerUpdateService: SwUpdate;
    private previousPath: string = "";

    public CurrentLocation: string;
    public UpdateAvailable: boolean = false;

    public constructor(authenticationService: AuthenticationService,
                       router: Router,
                       serviceWorkerUpdateService: SwUpdate)
    {
        this.authenticationService = authenticationService;
        this.router = router;
        this.serviceWorkerUpdateService = serviceWorkerUpdateService;
    }

    public ngOnInit()
    {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.CurrentLocation = event.url;
        });

        if (this.serviceWorkerUpdateService.isEnabled)
        {
            this.serviceWorkerUpdateService.available.subscribe(() => {
                this.UpdateAvailable = true;
            });
        }
    }

    public UserName()
    {
        const userName: string = this.authenticationService.GetUser().Name;
        if (userName != undefined)
        {
            let twoWords = userName.split(" ");

            if (twoWords.length > 1)
            {
                return twoWords[0].slice(0, 1) + twoWords[1].slice(0, 1);
            }
            else
            {
                return twoWords[0].slice(0, 1);
            }
        }
    }

    public Login()
    {
        this.authenticationService.Login();
    }

    public Logout()
    {
        this.authenticationService.Logout();
    }

    public IsUserLoggedIn()
    {
        return this.authenticationService.IsAuthenticated();
    }

    public GetAnimation(outlet) {
        return outlet.activatedRouteData["page"];
    }
}
