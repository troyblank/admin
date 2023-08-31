export const HOME_PATH: string = '/'
export const COMPLETE_USER_PATH: string = '/completeUser'
export const PROFILE_PATH: string = '/profile'
export const SIGN_IN_PATH: string = '/signIn'

export const redirect = (url: string, replace: (url: string) => void) => {
	// https://github.com/vercel/next.js/issues/42556

	// troy, you dumb use server side props here instead

	// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
	// https://stackoverflow.com/questions/60755316/next-js-getserversideprops-show-loading/60756105#60756105
	setTimeout(() => {
		replace(url)
	}, 0)
}
