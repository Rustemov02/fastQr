import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Order } from "../../types";

interface CreateOrderPayload {
  tableNumber: number;
  items: CartItem[];
  totalPrice: number;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunk to create an order via the Express API
export const createOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "order/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      // Transform CartItem[] to the backend's expected format: { menuItemId, name, price, quantity }
      const items = payload.items.map((ci) => ({
        menuItemId: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
      }));

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: payload.tableNumber,
          items,
          totalPrice: payload.totalPrice,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to create order");
      }

      const data = await res.json();
      return data as Order;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderLocally(state, action: PayloadAction<CreateOrderPayload>) {
      const { tableNumber, items, totalPrice } = action.payload;
      const newOrder: Order = {
        id: crypto.randomUUID(),
        tableNumber,
        items,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { createOrderLocally, setOrders } = orderSlice.actions;
export default orderSlice.reducer;