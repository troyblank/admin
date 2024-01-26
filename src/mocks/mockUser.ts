import Chance from 'chance'
import { type User } from '../types'

const chance = new Chance()

export const mockUser = (overrides: Partial<User> = {}): User => {
	const fullName: string = `${chance.first()} ${chance.last()}`

	return {
		fullName,
		jwtToken: chance.guid(),
		username: chance.name(),
		...overrides,
	}
}
