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
      // Use babel-jest to transpile tests with the next/babel preset
      // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
      "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest" ],
    },
    transformIgnorePatterns: [
      "/node_modules/",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
  
  