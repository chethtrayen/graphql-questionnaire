import jwt from "jsonwebtoken";
import { JwtError, JwtExpiredError, JwtNotBeforeError } from "./errors";
import config from "../../config";

const secret = config.auth.jwtSecret;
const expiresIn = config.auth.jwtExpiresIn;

// export const JwtService: JwtServiceInterface = {
export const JwtService = {
  sign(payload: string | object | Buffer, options?: jwt.SignOptions): string {
    return jwt.sign(payload, secret, options);
  },

  signWithExpiry(payload: string | object | Buffer): string {
    return this.sign(payload, { expiresIn });
  },

  signWithNotBefore(payload: string | object | Buffer, notBefore: number): string {
    return this.sign(payload, { notBefore });
  },

  verify(token: string): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      if (err instanceof jwt.NotBeforeError) {
        throw new JwtNotBeforeError(err.message);
      }
      if (err instanceof jwt.TokenExpiredError) {
        throw new JwtExpiredError(err.message);
      }
      if (err instanceof jwt.JsonWebTokenError) {
        throw new JwtError(err.message);
      }
      throw err;
    }
  },
};
