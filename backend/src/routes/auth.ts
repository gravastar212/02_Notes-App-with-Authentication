import { Router } from 'express';
import prisma from '../db';
import { hashPassword, generateToken, comparePassword  } from '../utils/auth';

const router = Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    // Generate token
    const token = generateToken({ userId: user.id });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken({ userId: user.id });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;