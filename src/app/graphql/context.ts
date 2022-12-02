import { ExpressContext } from "apollo-server-express";
import { Context, User } from "../../types";
import { RequestUtils } from "../../utils/request";

import {JwtService} from '../auth/jwt.service';

// eslint-disable-next-line @typescript-eslint/require-await
export const getGraphQLContext = async ({ req, res }: ExpressContext): Promise<Context> => {
  let context: Context = {
    req,
    res,
  };

  const tkn : string | null = RequestUtils.getTokenFromRequest(req);
  if(tkn){
    const payload = JwtService.verify(tkn) as User;
    context = {
      ...context,
      user: {id: payload.id}
    }
  }
  
  return context;
};
