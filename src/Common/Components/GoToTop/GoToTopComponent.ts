import { HostListener, Component } from "@angular/core";

@Component({
    selector: "go-to-top",
    templateUrl: "./GoToTopComponent.html",
    styleUrls: ["./GoToTopComponent.scss"]
  })
export class GoToTopComponent
{
    public showScroll: boolean;
    public ShowScrollHeight = 100;
    public HideScrollHeight = 10;

    @HostListener("window:scroll", [])
    public OnWindowScroll(): void
    {
        if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
            > this.ShowScrollHeight)
        {
            this.showScroll = true;
        }
        else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop ||
            document.body.scrollTop) < this.HideScrollHeight)
        {
            this.showScroll = false;
        }
    }

    public ScrollToTop(): void
    {
        (function SmoothScroll()
        {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0)
            {
                let delay: number = 5;
                window.requestAnimationFrame(SmoothScroll);
                window.scrollTo(0, currentScroll - (currentScroll / delay));
            }
        })();
    }

    public Clear(): void
    {
    }
}