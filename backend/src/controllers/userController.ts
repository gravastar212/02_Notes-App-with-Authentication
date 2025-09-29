import { Response } from "express";
import prisma from "../db";
import { AuthRequest } from "../middleware/authMiddleware";

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId; // from auth middleware
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}
