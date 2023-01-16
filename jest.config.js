module.exports = {
    collectCoverage: true,
    coverageProvider: "v8",
    collectCoverageFrom: [
      "**/*.{js,jsx,ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!<rootDir>/out/**",
      "!<rootDir>/.next/**",
      "!<rootDir>/*.config.js",
      "!<rootDir>/coverage/**",
      "!dist/**",
    ],
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    testEnvironment: "node",
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'ts'],
    transformIgnorePatterns: [
      "/node_modules/",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
  