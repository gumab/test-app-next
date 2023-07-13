import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);

  const { command, ms } = req.query;

  if (command === 'wait') {
    await new Promise((res) => setTimeout(res, Number(ms) || 1000));
  }

  res.json(req.query);
};
