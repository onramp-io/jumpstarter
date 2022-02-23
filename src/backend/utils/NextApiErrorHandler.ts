import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

const JumpstarterApiErrorHandler = (
  res: NextApiResponse,
  controllerReturnValue: any,
  statusCode: string
) => {
  // Everything went well as intended
  if (statusCode === StatusCodes.OK) {
    res.status(StatusCodes.OK).send;
    // Something went wrong on the Clientside (i.e. something missing from the req.body)
  } else if (statusCode === StatusCodes.BAD_REQUEST) {
    // Something went wrong with the DB
  } else if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
  }
};
