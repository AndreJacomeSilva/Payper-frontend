import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import Typed from "typed.js";
import { WebRequestService } from "../../Common/Services/WebRequests/WebRequestService";
import { WebRequest } from "../../Common/Services/WebRequests/Models/WebRequest";
import { WebRequestMethods } from "../../Common/Services/WebRequests/Models/WebRequestMethods";
import { AuthenticationService } from "../../Common/Services/Authentication/AuthenticationService";

@Component({
  selector: "home",
  templateUrl: "./HomeComponent.html",
  styleUrls: ["./HomeComponent.scss"]
})
export class HomeComponent implements OnInit
{
    private webRequestService: WebRequestService;
    private authenticationService: AuthenticationService;
    private opacityAnimationTimeoutInSeconds: number = 1000;
    private Services = [  {Codename: "electricity", AlternateText: "eletricidade"},
                          {Codename: "gas", AlternateText: "gás"},
                          {Codename: "water", AlternateText: "água"},
                          {Codename: "telecommunications", AlternateText: "telecomunicações"},
                          {Codename: "insurances", AlternateText: "seguros"}];

    public HowItWorksItems =
        [{Index: "1", Icon: "upload", Text: "FAZER UPLOAD DA FATURA"},
         {Index: "2", Icon: "analysis", Text: "O PAYPER ANALISA A SUA FATURA E COMPARA COM TODOS OS OPERADORES"},
         {Index: "3", Icon: "notifications", Text: "NOTIFICAÇÃO DOS RESULTADOS"},
         {Index: "4", Icon: "savings", Text: "POUPANÇA NA SUAS FATURAS"}];
    public CurrentService: any;
    public NewsletterEmail: string;
    public HasAlreadySubscribedNewsletter: boolean;
    public NewsletterError: string;

    public constructor(private _elementRef: ElementRef, private renderer: Renderer2,
        webRequestService: WebRequestService,
        authenticationService: AuthenticationService)
    {
        this.webRequestService = webRequestService;
        this.authenticationService = authenticationService;
    }

    public ngOnInit(): void
    {
        const options = {
            strings: ["Eletricidade.", "Gás.^2000", "Água.^2000", "Telecomunicações", "Seguros.^1000"],
            typeSpeed: 60,
            backSpeed: 80,
            showCursor: true,
            cursorChar: "_",
            loop: true,
            preStringTyped: this.OnPreStringTypedCallback
        };

        let typed = new Typed(".typed-element", options);
        this.CurrentService = this.Services[0];
    }

    public OnPreStringTypedCallback = (arrayPos: number, self: Typed) =>
    {
        let element = this._elementRef.nativeElement.querySelector("#serviceLogo");
        this.renderer.setStyle(element, "opacity", 0);
        this.renderer.setStyle(element, "transition", "opacity 2s");
        setTimeout(() => {
            this.CurrentService = this.Services[arrayPos];
            this.renderer.setStyle(element, "opacity", 1);
        }, this.opacityAnimationTimeoutInSeconds);
    }

    public Scroll(el: HTMLElement): void
    {
        el.scrollIntoView({ behavior: "smooth" });
    }

    public SubscribeNewsletter()
    {
        this.NewsletterError = null;
        let request: WebRequest = new WebRequest(
            "https://script.google.com/macros/s/AKfycbybP19IHbdDZMIjVRr70FwNA-zn2D9cBBVDtHT_q9n9aHiANrsa/exec?email="
            + this.NewsletterEmail
            , WebRequestMethods.Get);
        this.webRequestService.RequestUsingHttpServiceWithoutAuth(request, null)
            .then((res) => {
                if (res.success)
                {
                    this.HasAlreadySubscribedNewsletter = true;
                }
                else
                {
                    this.CreateNewsletterErrorMessage(res);
                }
            })
            .catch((error) => {
                console.log("Erro: " + error.Reason + " Codigo: " + error.StatusCode);
            });
    }

    private CreateNewsletterErrorMessage(res: any) {
        switch (res.errorCode) {
            case "DUPLICATE_EMAIL":
                this.NewsletterError = "Email já registado. Por favor introduza outro.";
                break;
            case "INVALID_EMAIL":
                this.NewsletterError = "Email inválido. Por favor introduza outro.";
                break;
        }
    }

    public LoginRedirectToUpload()
    {
        this.authenticationService.LoginRedirectToUpload();
    }
}
