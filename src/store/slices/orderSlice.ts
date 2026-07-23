import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Order } from "../../types";

interface CreateOrderPayload {
  tableNumber: number;
  items: CartItem[];
  totalPrice: number;
}

interface UpdateOrderStatusPayload {
  id: string;
  status: Order["status"];
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

const API_BASE = "http://localhost:5000/api/orders";

// Helper to transform backend order to frontend Order type
function transformOrder(backendOrder: any): Order {
  return {
    id: backendOrder._id ?? backendOrder.id,
    tableNumber: backendOrder.tableNumber,
    items: backendOrder.items.map((item: any) => ({
      item: {
        id: item.menuItemId ?? item.item?.id ?? "",
        name: item.name ?? item.item?.name ?? "",
        price: item.price ?? item.item?.price ?? 0,
        description: "",
        category: "",
        image: "",
        isAvailable: true,
      },
      quantity: item.quantity,
    })),
    totalPrice: backendOrder.totalPrice,
    status: backendOrder.status,
    createdAt: backendOrder.createdAt,
  };
}

// Async thunk to create an order via the Express API
export const createOrder = createAsyncThunk<Order, CreateOrderPayload>(
  "order/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const items = payload.items.map((ci) => ({
        menuItemId: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
      }));

      const res = await fetch(API_BASE, {
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
      return transformOrder(data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk to fetch a single order by ID
export const fetchOrderById = createAsyncThunk<Order, string>(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to fetch order");
      }
      const data = await res.json();
      return transformOrder(data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk to fetch multiple orders by IDs (for multi-order status tracking)
export const fetchMultipleOrders = createAsyncThunk<Order[], string[]>(
  "order/fetchMultipleOrders",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to fetch orders");
      }
      const data = await res.json();
      return data.map(transformOrder);
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk to fetch active (non-completed) orders for the kitchen
export const fetchOrders = createAsyncThunk<Order[], void>(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Failed to fetch orders");
      }
      const data = await res.json();
      return data.map(transformOrder);
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk to update order status (PATCH /:id/status)
export const updateOrderStatus = createAsyncThunk<
  Order,
  UpdateOrderStatusPayload
>("order/updateOrderStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message || "Failed to update order status");
    }

    const data = await res.json();
    return transformOrder(data);
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

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
      // createOrder
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
      })
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orders.findIndex((o) => o.id === updated.id);
        if (index !== -1) {
          // If the order was marked completed, remove it from the active list
          if (updated.status === "completed") {
            state.orders.splice(index, 1);
          } else {
            state.orders[index] = updated;
          }
        }
        if (state.currentOrder?.id === updated.id) {
          state.currentOrder = updated;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { createOrderLocally, setOrders } = orderSlice.actions;
export default orderSlice.reducer;