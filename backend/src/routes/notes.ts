import { Router } from 'express';
import prisma from '../db';
import { requireAuth, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// Create note
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.userId,
      },
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all notes for user
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get one note
router.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
    });

    if (!note || note.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update note
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    const note = await prisma.note.findUnique({ where: { id: req.params.id } });

    if (!note || note.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const updated = await prisma.note.update({
      where: { id: req.params.id },
      data: { title, content },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete note
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const note = await prisma.note.findUnique({ where: { id: req.params.id } });

    if (!note || note.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await prisma.note.delete({ where: { id: req.params.id } });

    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;