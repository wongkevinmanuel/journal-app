/** @type {import('ts-jest').JestConfigWithTsJest} **/

import { Config } from '@jest/types';


export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
    
  },
  preset: "ts-jest",
  //"ts-jest"
  //Especificar patrones de modulos que sean
  // ignorados por la parte de jest
  transformIgnorePatterns: [],

  setupFiles: ["<rootDir>/src/jest.setup.js"],
};