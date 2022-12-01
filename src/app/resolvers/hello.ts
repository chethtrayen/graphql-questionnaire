export default  {
  Query: {
    hello : (_: never, args: {name: string}): string => {
      console.log(args)
      return args.name || 'there'
    }
  }
}