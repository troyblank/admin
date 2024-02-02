import {
	type SignInInput,
	type ConfirmResetPasswordInput,
	type UpdatePasswordInput,
} from 'aws-amplify/auth'
import { type User } from '../'

export type UserAttributes = {
	family_name: string,
	given_name: string,
}

export type SignInOutput = {
	isUserComplete: boolean
}

export type RestPasswordCodeOutput = {
	isPasswordResetCodeSent: boolean
}

export type AttemptToSignIn = ({ username, password }: SignInInput) => Promise<SignInOutput>
export type AttemptToResetPassword = (resetPasswordInput: ConfirmResetPasswordInput) => Promise<void>
export type AttemptToResetPasswordCode = (username: string) => Promise<RestPasswordCodeOutput>
export type AttemptToCompleteNewUser = (password: string, attributes: UserAttributes) => Promise<void>
export type AttemptToChangePassword = ({ oldPassword, newPassword }: UpdatePasswordInput) => Promise<void>

export type AuthContextType = {
	attemptToChangePassword: AttemptToChangePassword,
	attemptToCompleteNewUser: AttemptToCompleteNewUser,
	attemptToResetPassword: AttemptToResetPassword,
	attemptToGetResetPasswordCode: AttemptToResetPasswordCode,
	attemptToSignIn: AttemptToSignIn,
	user: User | null,
}
