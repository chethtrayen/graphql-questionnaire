/* eslint-disable @typescript-eslint/require-await */
import { ExpressContext } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-errors";
import { Context, User } from "@type";
import { authQuery, RequestUtils } from "../../utils";

import { JwtService } from "../auth/jwt.service";

export const getGraphQLContext = async ({ req, res }: ExpressContext): Promise<Context | AuthenticationError> => {
  let context: Context = {
    req,
    res,
  };

  // Check which payload contains the query
  const query = req.body.query || req.query.query;

  // Check if query is secure
  const isAuthQuery = authQuery.some((q) => query.indexOf(q) > -1);

  if (isAuthQuery) {
    const tkn: string | null = RequestUtils.getTokenFromRequest(req);

    if (tkn) {
      // Get userId and store into context
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
