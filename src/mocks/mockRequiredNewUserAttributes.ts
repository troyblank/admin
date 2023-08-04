import Chance from 'chance'
import { RequiredNewUserAttributesType } from '../types'

const chance = new Chance()

export const mockRequiredNewUserAttributes = (): RequiredNewUserAttributesType => ({
	family_name: chance.last(),
	given_name: chance.first(),
})