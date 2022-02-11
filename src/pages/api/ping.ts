import type { NextApiRequest, NextApiResponse } from 'next';
import pingHandler from '../../backend/controller/status/ping';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
    pingHandler(req, res);
  } else {
    console.log(req.body);
    // Handle any other HTTP method
  }
}
