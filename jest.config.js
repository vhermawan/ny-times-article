module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!***.config.js',
    '!**.*.js',
    '!**sonarqube-scanner.js',
  ],
  moduleNameMapper: {

    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    
    '@/common/(.*)$': '<rootDir>/src/common/$1',
    '@/data/(.*)$': '<rootDir>/src/data/$1',
    '@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/assets/', '<rootDir>/features/*/constant'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
};
