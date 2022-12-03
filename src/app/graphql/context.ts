/* eslint-disable @typescript-eslint/require-await */
import { ExpressContext } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-errors";
import { Context, User } from "../../types";
import { RequestUtils } from "../../utils/request";

import { JwtService } from "../auth/jwt.service";

const authQuery = ["createQuestionnaire", "getQuestionnaires", "updateQuestionnaire"];

export const getGraphQLContext = async ({ req, res }: ExpressContext): Promise<Context | AuthenticationError> => {
  let context: Context = {
    req,
    res,
  };
  const isAuthQuery = authQuery.some((query) => req.body.query.indexOf(query) > -1);

  if (isAuthQuery) {
    const tkn: string | null = RequestUtils.getTokenFromRequest(req);

    if (tkn) {
      const payload = JwtService.verify(tkn) as User;
      context = {
        ...context,
        user: { id: payload.id },
      };
    } else {
      throw new AuthenticationError("Error: Session doesn't exist");
    }
  }

  return context;
};
