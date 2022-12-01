import { Authenticable } from "./auth";

export interface User extends Authenticable{
  id: number;
}

export interface IUser {
  login: (email: string) => Promise<string>;
}