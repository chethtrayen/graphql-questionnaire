import userService from './user.service'

export default {
  Query: {
    login: async (_: never, {email}: {email: string}): Promise<string| Error> => await userService.login(email)
  }
}