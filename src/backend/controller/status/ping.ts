import type { NextApiRequest, NextApiResponse } from 'next';

const pingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('pong');
};

export default pingHandler;
