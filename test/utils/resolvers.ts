import {  mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from "path";

const resolverArray = loadFilesSync(path.join(__dirname, '/../../src/app/resolvers/*.ts'))
export default mergeResolvers(resolverArray)