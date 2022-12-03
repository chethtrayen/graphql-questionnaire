import { APIResponse } from "@type";
import { Authenticable } from "./auth";

export interface User extends Authenticable {
  id: number;
  name?: string;
}

export interface IUser {
  login: (email: string) => APIResponse<string>;
}
