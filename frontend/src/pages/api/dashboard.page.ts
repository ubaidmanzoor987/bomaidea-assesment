import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API GET handler for receiving users
 * @param req request parameters
 * @param res response that returns users with id, name, job title, email and role
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {
      id: 2,
      name: 'Doug',
      title: 'Lead',
      email: 'abc@gmail.com',
      role: 'Admin',
    },
  ]);
}
