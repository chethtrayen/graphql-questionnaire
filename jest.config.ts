export default {
  collectCoverageFrom: ["./<rootDir>/src/**/*.(t|j)s"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "@config": "<rootDir>/src/config/index.ts",
    "@context": "<rootDir>/src/app/graphql/context",
    "@modules/(.*)": "<rootDir>/src/app/modules/$1",
    "@prismaClient": "<rootDir>/src/prisma-client.ts",
    "@testUtils": "test/utils/index.ts",
    "@type": "<rootDir>/src/types/index.ts",
  },
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
