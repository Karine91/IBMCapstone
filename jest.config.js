/** @type {import('ts-jest').JestConfigWithTsJest} **/
import { createDefaultPreset } from "ts-jest";
export default {
  ...createDefaultPreset(),
  modulePaths: ["<rootDir>"],
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      { isolatedModules: true, tsconfig: "tsconfig.test.json" },
    ],
  },
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
    "^uuid$": "<rootDir>/src/__mocks__/uuid.js",
  },
};
