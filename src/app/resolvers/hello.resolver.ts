export default  {
  Query: {
    hello : (_: never, args: {name: string}): string => {
      return args.name || 'there'
    }
  }
}