import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./App/AppModule";
import { Environment } from "./Environments/Environment";

if (Environment.Production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
        if ("serviceWorker" in navigator && Environment.Production) {
            navigator.serviceWorker.register("/ngsw-worker.js");
        }
    })
    .catch(err => console.error(err));
