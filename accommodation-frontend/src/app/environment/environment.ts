export const environment = {
    API_URL: "http://localhost:9000",
    CLIENT_ID: "oidc-client",
    // TODO: Use code with PKCE, then we will remove secret from here
    CLIENT_SECRET: "oidc-secret",
    REDIRECT_URL: "http://localhost:4200/callback",
    STATE_LENGTH: 8
}