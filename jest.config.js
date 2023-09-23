const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper:{"^uuid$": "uuid"},
	setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
	collectCoverage: true,
	coverageReporters: ['lcov', 'text-summary'],
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
	coveragePathIgnorePatterns: [
		'index.ts',
		'<rootDir>/src/mocks'
	],
	// testMatch: [ '<rootDir>/src/someFile.test.tsx' ], //Left here intentionally to test single files easy
};

module.exports = createJestConfig(customJestConfig);
