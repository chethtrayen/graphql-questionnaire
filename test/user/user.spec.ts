import userService from "@modules/user/user.service"
import prisma from "@prisma"

describe("User unit test", () => {
  
  describe('User login', () => {
   
    describe('Success user login', () => {
      it("should return jwt token", async () => {
        jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
          id: 1,
          email: "foo@bar.com",
          name: 'foo bar'
        });
        
        const jwtToken: string | Error = await userService.login("foo@bar.com");
        expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
        expect(typeof jwtToken).toEqual('string')
      });
    })


    describe('UnSuccessful user login', () => {
      it("should return an error",  () => {
          jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(null);

          // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
          expect(() =>  userService.login("foo@bar.com")).rejects.toThrow("Error: user not found.");
      })

    });
  })
});
