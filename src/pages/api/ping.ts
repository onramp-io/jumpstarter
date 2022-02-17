import type { NextApiRequest, NextApiResponse } from 'next';
import pingHandler from '../../backend/controller/status/ping';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch(req.method) {
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
    case 'GET': pingHandler(req, res);
    default: console.log(req.body);
  }
}
