import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

export default app;