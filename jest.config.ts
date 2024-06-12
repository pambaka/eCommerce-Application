module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    //   '^@/(.*)$': '<rootDir>/src/$1',
    //   // '\\.(scss|css)$': '<rootDir>/src/styleMock.ts',
    '\\.(scss)$': '<rootDir>/__tests__/mocks/styleMock.ts',
    // '\\.(png|svg)$': '<rootDir>/src/assetsMock.ts',
    '\\.(png|svg)$': '<rootDir>/__tests__/mocks/assetsMock.ts',
    //   '^@src/(.*)$': '<rootDir>/src/$1',
    //   '^@components/(.*)$': '<rootDir>/src/components/$1',
    //   '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    //   '^@services/(.*)$': '<rootDir>/src/services/$1',
    //   '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    //   '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  setupFiles: ['./jest.setup.ts'],
};

export default {};
