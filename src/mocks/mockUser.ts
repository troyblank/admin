import Chance from 'chance'
import { UserType, REQUIRED_USER_FIELDS } from '../types'

const chance = new Chance()

export const mockUser = (): UserType => {
	const fullName: string = `${chance.first()} ${chance.last()}`
	const isValid: boolean = chance.bool()
	const requiredValues: REQUIRED_USER_FIELDS[] = Object.values(REQUIRED_USER_FIELDS) as REQUIRED_USER_FIELDS[]
	const requiredValuesLength: number = requiredValues.length
    
	return {
		fullName,
		isValid,
		jwtToken: chance.guid(),
		needsNewPassword: isValid ? false : chance.bool(),
		requiredAttributes:  isValid ? [] : chance.pickset(requiredValues, chance.natural({ max: requiredValuesLength })),
		userName: chance.name(),
	}
}