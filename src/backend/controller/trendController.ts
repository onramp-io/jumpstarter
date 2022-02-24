import connection from '@backend/config/db';
import { Project } from '@backend/entities/Project';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getAllTrending = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connection();
  try {
    res.status(200).json("success")
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res.status(500).json(message);
  }
};

export const calculateTrendingScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connection();
  try {
    res.status(200).json("success")
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res.status(500).json(message);
  }
};

const calculateScore = (likesDelta, fundsDelta, viewsDelta) => {
  return likesDelta + fundsDelta + viewsDelta;
}

export default { getAllTrending, calculateTrendingScores };
