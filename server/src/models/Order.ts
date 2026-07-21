import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  tableNumber: number;
  items: IOrderItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema(
  {
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    tableNumber: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);