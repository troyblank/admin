import { type SignInInput } from 'aws-amplify/auth'
import { type User } from '../'

export type UserAttributes = {
	family_name: string,
	given_name: string,
}

export type SignInOutput = {
	isUserComplete: boolean
}

export type AttemptToSignIn = ({ username, password }: SignInInput) => Promise<SignInOutput>
export type AttemptToCompleteNewUser = (password: string, attributes: UserAttributes) => Promise<void>

export type AuthContextType = {
	attemptToCompleteNewUser: AttemptToCompleteNewUser
	attemptToSignIn: AttemptToSignIn,
	user: User | null,
}
