// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers = {
  Query: {
    hello : (_: never, args: {name: string}): string => {
      console.log(args)
      return args.name || 'there'
    }
  }
}

export default resolvers;
