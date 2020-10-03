module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: '<rootDir>/jest.setup.js',
    moduleNameMapper: {
        '^app/(.*)': '<rootDir>/src/$1'
    }
};
