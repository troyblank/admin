type JWT = {
    toString: () => string;
}

type AuthTokens = {
    idToken?: JWT;
    accessToken: JWT;
}

export type AuthSession = {
    tokens?: AuthTokens;
    identityId?: string;
    userSub?: string;
}
