import { UserType } from '../'

export type RequiredNewUserAttributesType = {
    family_name: string,
    given_name: string,
}

export type AttemptToSignInType = (userName: string, password: string) => Promise<UserType | null>
export type AttemptToCompleteNewUserType = (password: string, attributes: RequiredNewUserAttributesType) => Promise<any>

export type AuthContextType = {
    attemptToCompleteNewUser: AttemptToCompleteNewUserType
    attemptToSignIn: AttemptToSignInType,
    user: UserType | null,
}
