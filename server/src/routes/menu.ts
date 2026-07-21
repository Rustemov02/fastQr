import { Router, Request, Response } from "express";
import MenuItem from "../models/MenuItem.js";

const router = Router();

// GET /api/menu - Fetch all menu items
router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error });
  }
});

export default router;