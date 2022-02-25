import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTrending, calculateTrendingScores } from '../../backend/controller/trendController';

type Data = {
  name: string;
  success: boolean
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch(req.method) {
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
    case 'GET': getAllTrending(req, res);
    case 'POST': calculateTrendingScores(req, res);
    default: console.log(req.body);
  }
}
