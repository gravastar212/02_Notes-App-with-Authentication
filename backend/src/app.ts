import express from 'express';
import prisma from './db';

const app = express();

app.get('/test-db', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default app;