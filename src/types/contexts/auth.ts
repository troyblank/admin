export type AttemptToSignInType = ( userName: string, password:string ) => Promise<any>

export type AuthContextType = {
    attemptToSignIn: AttemptToSignInType
}
