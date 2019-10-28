export const Environment = {
    Production: true,
    B2cScopes: ["https://payperdevelop.onmicrosoft.com/access-api/user_impersonation"],
    TenantConfig: {
        tenant: "payperdevelop.onmicrosoft.com",
        clientID: "401ff960-09da-4af7-a512-bdaf362ce7e2",
        signUpSignInPolicy: "B2C_1_Demo_sign_up_sign_in",
        profileEditing: "B2C_1_Demo_profile",
        passwordRecovery: "B2C_1_passwordreset",
        redirectUri: "https://payperdevelop.azureedge.net/",
    },
    B2cLoginUrl: "https://payperdevelop.b2clogin.com/tfp/",
    ApiUrl: "https://payper-develop.azurewebsites.net/",
    AppInsightsKey: "79b45845-389b-49ab-a059-2f28b59cf149"
};
