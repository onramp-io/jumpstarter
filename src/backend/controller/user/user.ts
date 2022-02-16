import type { NextApiRequest, NextApiResponse } from 'next';

const user_controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  res.status(200).json({ name: user.attributes.given_name });
};

export default user_controller;
