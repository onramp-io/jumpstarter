import type { NextApiRequest, NextApiResponse } from 'next';
import user_controller from '../../backend/controller/user/user';

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
    user_controller(req, res);
  } else {
    console.log(req.body);
    // Handle any other HTTP method
  }
}
