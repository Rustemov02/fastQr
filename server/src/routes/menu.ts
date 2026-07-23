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

// GET /api/menu/:id - Fetch a single menu item
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu item", error });
  }
});

// POST /api/menu - Create a new menu item
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    if (!name || !description || !price || !category || !image) {
      res.status(400).json({ message: "All required fields must be provided" });
      return;
    }

    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      isAvailable: isAvailable ?? true,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item", error });
  }
});

// PUT /api/menu/:id - Update a menu item
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image, isAvailable },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item", error });
  }
});

// PATCH /api/menu/:id - Partial update (e.g., toggle isAvailable)
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item", error });
  }
});

// DELETE /api/menu/:id - Delete a menu item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }

    res.json({ message: "Menu item deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item", error });
  }
});

export default router;