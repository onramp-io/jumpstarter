import type { NextApiRequest, NextApiResponse } from 'next';

const pingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("ping");
  try {
    const { authorization } = req.headers;

    if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
  //res.send('pong');
};

export default pingHandler;
