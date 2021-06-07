export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  coverageDirectory: "./coverage",
  testMatch: [
    "**/test/*.spec.ts"
  ],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    'ts-jest': {
      useESM: true,
    }
  },
};
