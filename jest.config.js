// const transformWhitelistPackages = [
// 	'@aws-sdk',
// 	'aws-amplify',
// 	'uuid',
// ]

// const nextJest = require("next/jest");

// const createJestConfig = nextJest({
//   dir: "./",
// });

// const customJestConfig = {
// clearMocks: true,
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//   testEnvironment: "jest-environment-jsdom",
//   moduleNameMapper:{"^uuid$": "uuid"},
//   	moduleFileExtensions: ['ts', 'tsx', 'js'],
// 	rootDir: './',
// 	roots: ['<rootDir>/src'],
//   setupFilesAfterEnv: ['<rootDir>/config/jest/setup.js'],
//   collectCoverage: true,
// 	coverageReporters: ['lcov', 'text-summary'],
// 	coverageThreshold: {
// 		global: {
// 			statements: 100,
// 			branches: 100,
// 			functions: 100,
// 			lines: 100,
// 		},
// 	},
//   testMatch: [ '<rootDir>/src/components/signInForm/signInForm.test.tsx' ], //Left here intentionally to test single files easy
//   	transform: {
// 		'\\.[jt]sx?$': ['ts-jest', {
// 			isolatedModules: true
// 		}
// 	] },
// 	transformIgnorePatterns: [
// 		`node_modules/(?!(${transformWhitelistPackages.join('|')})/)`,
// 	],
// };

// module.exports = createJestConfig(customJestConfig);

// const transformWhitelistPackages = [
// 	'@aws-sdk',
// 	'aws-amplify',
// 	'uuid',
// ]

// module.exports = {
// 	collectCoverage: true,
// 	coverageReporters: ['lcov', 'text-summary'],
// 	coverageThreshold: {
// 		global: {
// 			statements: 100,
// 			branches: 100,
// 			functions: 100,
// 			lines: 100,
// 		},
// 	},
// 	moduleFileExtensions: ['ts', 'tsx', 'js'],
// 	rootDir: './',
// 	roots: ['<rootDir>/src'],
// 	// testMatch: [ '<rootDir>/src/someFile.test.tsx' ], //Left here intentionally to test single files easy
// 	clearMocks: true,
// 	testEnvironment: 'jest-environment-jsdom',
// 	setupFilesAfterEnv: ['<rootDir>/config/jest/setup.js'],
// 	transform: {
// 		'\\.[jt]sx?$': ['ts-jest', {
// 			isolatedModules: true
// 		}
// 	] },
// 	transformIgnorePatterns: [
// 		`node_modules/(?!(${transformWhitelistPackages.join('|')})/)`,
// 	],
// }

const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper:{"^uuid$": "uuid"},
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  // testMatch: [ '<rootDir>/src/someFile.test.tsx' ], //Left here intentionally to test single files easy
};

module.exports = createJestConfig(customJestConfig);
