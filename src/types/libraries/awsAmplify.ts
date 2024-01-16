import { REQUIRED_USER_FIELDS } from '../'

export type CognitoUserSessionType = { accessToken: { jwtToken: string } }
export type CognitoUserType = {
	attributes: {
		given_name: string,
		family_name: string,
	},
	challengeName: string,
	challengeParam?: {
		requiredAttributes?: REQUIRED_USER_FIELDS[],
	},
	signInUserSession: { idToken: { jwtToken: string } },
	username: string,
}
