import { User } from "../../src/types/user"
import userService from "../../src/app/services/user.service"
import prisma from "../../src/prisma-client"

describe("User unit test", () => {

  const mockUser: User = {
    id: 1,
    email: "foo@bar.com",
    name: 'foo bar'
  }
  
  
  describe('User login', () => {
   
    describe('Success user login', () => {
      it("should return jwt token", async () => {
        jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(mockUser);
        
        const jwtToken: string | Error = await userService.login(mockUser.email);
        expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
        expect(typeof jwtToken).toEqual('string')
      });
    })


    describe('UnSuccessful user login', () => {
      it("should return an error",  () => {
          jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(null);

          // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
          expect(() =>  userService.login(mockUser.email)).rejects.toThrow("Error: user not found.");
      })

    });
  })
});
