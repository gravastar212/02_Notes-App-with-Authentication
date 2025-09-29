import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { hashPassword, comparePassword, generateToken, verifyToken } from './utils/auth';

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json()); // Parse JSON body
app.use(morgan('dev'));  // Log HTTP requests

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy ✅' });
});

app.get('/auth-test', async (_req, res) => {
  const password = 'mySecret123';
  const hash = await hashPassword(password);
  const match = await comparePassword(password, hash);

  const token = generateToken({ userId: '123' });
  const decoded = verifyToken(token);

  res.json({
    original: password,
    hash,
    match,
    token,
    decoded,
  });
});

export default app;