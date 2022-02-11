import type { NextApiRequest, NextApiResponse } from 'next';

const user_controller = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('im the user controller');
};

export default user_controller;
