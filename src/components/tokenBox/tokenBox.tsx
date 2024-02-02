import React, { useState, Fragment } from 'react'
import { useAuth } from '../../contexts'

export const TokenBox = () => {
	const { user } = useAuth()
	const [isShowingToken, setIsShowingToken] = useState<boolean>(false)

	if (user) {
		return (
			<Fragment>
				<button onClick={() => setIsShowingToken(!isShowingToken)}>{isShowingToken ? 'Hide' : 'Show'} token</button>
				<br />
				{isShowingToken &&
					<textarea  id={'jwtToken'} defaultValue={user?.jwtToken} cols={100} rows={15} />
				}
			</Fragment>
		)
	}

	return null
}
