import '@testing-library/jest-dom';

// To allow 3rd party SSR libraries to work in jest. (e.g. amplify)
global.Request = jest.fn()
global.Response = jest.fn()

global.afterEach(() => {
	jest.spyOn(console, 'info').mockImplementation(() => {})

	jest.clearAllMocks()
})

window.alert = jest.fn()
