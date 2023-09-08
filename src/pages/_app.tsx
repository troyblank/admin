import { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'

Amplify.configure({
	Auth: {
		region: 'us-west-2',
		userPoolId: 'us-west-2_2MIJDuwNb',
		userPoolWebClientId: 'vhhhksehmohvv090pmvuok8i1',
		authenticationFlowType: 'USER_PASSWORD_AUTH',
	},
	ssr: true,
})

export const App = ({
	Component,
	pageProps,
}: AppProps) => (<Component {...pageProps} />)

export default App
