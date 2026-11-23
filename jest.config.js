module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/Tests/**/*.test.js"],
  setupFiles: ["<rootDir>/src/Tests/setupEnv.js"],
  maxWorkers: 1,
};
