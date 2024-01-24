import Chance from 'chance'
import { type UserAttributes } from '../types'

const chance = new Chance()

export const mockRequiredNewUserAttributes = (): UserAttributes => ({
	family_name: chance.last(),
	given_name: chance.first(),
})
