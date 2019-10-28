// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const Environment = {
    Production: false,
    B2cScopes: ["https://payperdevelop.onmicrosoft.com/access-api/user_impersonation"],
    TenantConfig: {
        tenant: "payperdevelop.onmicrosoft.com",
        clientID: "401ff960-09da-4af7-a512-bdaf362ce7e2",
        signUpSignInPolicy: "B2C_1_Demo_sign_up_sign_in",
        profileEditing: "B2C_1_Demo_profile",
        passwordRecovery: "B2C_1_passwordreset",
        redirectUri: "http://localhost:4200",
    },
    B2cLoginUrl: "https://payperdevelop.b2clogin.com/tfp/",
    ApiUrl: "https://payper-develop.azurewebsites.net/",
    AppInsightsKey: ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import "zone.js/dist/zone-error";  // Included with Angular CLI.
