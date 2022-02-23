import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { NextApiResponse } from "next";

const jumpstarterApiErrorHandler = (
  res: NextApiResponse,
  statusCode: StatusCodes
) => {
  // Something went wrong on the Clientside (i.e. something missing from the req.body)
  if (statusCode === StatusCodes.BAD_REQUEST) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
    // Something went wrong with the DB
  } else if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
};

export default jumpstarterApiErrorHandler;
