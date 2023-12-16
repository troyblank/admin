import React, { Fragment } from 'react'
import { useAuth } from '../../contexts'

export const TokenBox = () => {
	const { user } = useAuth()

	if (user) {
		return (
			<Fragment>
				<label htmlFor={'jwtToken'}>JWT Token:</label>
				<br />
				<textarea  id={'jwtToken'} defaultValue={user?.jwtToken} cols={100} rows={15} />
			</Fragment>
		)
	}

	return null
}
