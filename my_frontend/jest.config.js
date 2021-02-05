module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/style.ts',
  },
  testPathIgnorePatterns: ['^.*/cypress/.*$'],
}
