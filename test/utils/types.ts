import { User } from "@type";

export type TestUser = Omit<User, "id">;

export type TestUsersTkn = {
  testerTkn: string;
  negativeTesterTkn: string;
};
