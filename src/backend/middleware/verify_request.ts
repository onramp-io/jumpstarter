import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import admin from "../../firebase/admin/admin";

import chalk from "chalk";
import { AuthorizationError } from "helpers/ErrorHandling/errors";

export interface Request extends NextApiRequest {
  user: any;
}

export const verifyRequest = (handler: NextApiHandler) => {
  return async (req: Request, res: NextApiResponse) => {
    const accessToken = req.headers["authorization"];
    let token: string = "";

    try {
      if (!accessToken) {
        throw new AuthorizationError("Access token is required");
      } else {
        token = accessToken.split(" ")[1];
        const decoded = await admin.auth().verifyIdToken(token);
        if (!decoded) {
          throw new AuthorizationError("Invalid token");
        }
        req.user = decoded;
      }
    } catch (error) {
      if (error instanceof AuthorizationError) {
        res.status(error.code).json({
          status: error.status,
          error: error.message,
        });
      }
    }
    return handler(req, res);
  };
};
