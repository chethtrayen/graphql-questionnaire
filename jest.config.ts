export default {
  collectCoverageFrom: ["./<rootDir>/src/**/*.(t|j)s"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "@config": "<rootDir>/src/config/index",
    "@context": "<rootDir>/src/app/graphql/context",
    "@helpers/(.*)": "<rootDir>src/app/helpers/$1",
    "@jwtService": "<rootDir>/src/app/auth/jwt.service",
    "@modules/(.*)": "<rootDir>/src/app/modules/$1",
    "@prismaClient": "<rootDir>/src/prisma-client",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@testHelpers": "<rootDir>/test/helpers/index",
    "@testUtils": "test/utils/index",
    "@type": "<rootDir>/src/types/index",
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
