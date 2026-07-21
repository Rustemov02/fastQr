import { Router, Request, Response } from "express";
import Order from "../models/Order.js";

const router = Router();

// POST /api/orders - Create a new order
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Incoming order body:", JSON.stringify(req.body, null, 2));

    const { tableNumber, items, totalPrice } = req.body;

    if (!tableNumber || !items || !totalPrice) {
      res.status(400).json({ message: "Missing required fields: tableNumber, items, totalPrice" });
      return;
    }

    const order = await Order.create({
      tableNumber,
      items,
      totalPrice,
      status: "pending",
    });

    console.log("Order saved successfully:", order._id);
    res.status(201).json(order);
  } catch (error: any) {
    console.error("Failed to create order:", error.message);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// GET /api/orders - Fetch all orders sorted by createdAt descending
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    console.error("Failed to fetch orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "preparing",
      "ready",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: `Invalid status: ${status}` });
      return;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    console.log(`Order ${id} status updated to ${status}`);
    res.json(updatedOrder);
  } catch (error: any) {
    console.error("Failed to update order status:", error.message);
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
});

export default router;