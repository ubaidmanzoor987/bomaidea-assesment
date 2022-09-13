require('dotenv').config();
import express, { Response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function main() {
  // Testing
  app.get('/api/healthchecker', async (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'message',
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

