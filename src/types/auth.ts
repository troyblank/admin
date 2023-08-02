export enum REQUIRED_USER_FIELDS {
    family_name,
    given_name
}

export type UserType = {
    isValid: boolean,
    needsNewPassword: boolean,
    requiredAttributes: REQUIRED_USER_FIELDS[],
    userName: string
}
