import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../types";

const API_BASE = "http://localhost:5000/api/menu";

// Async Thunks
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      const data = await res.json();
      return data as MenuItem[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (item: Omit<MenuItem, "_id" | "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Failed to create menu item");
      const data = await res.json();
      return data as MenuItem;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, data }: { id: string; data: Partial<MenuItem> }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update menu item");
      const updated = await res.json();
      return updated as MenuItem;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAvailability = createAsyncThunk(
  "menu/toggleAvailability",
  async ({ id, isAvailable }: { id: string; isAvailable: boolean }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable }),
      });
      if (!res.ok) throw new Error("Failed to toggle availability");
      const updated = await res.json();
      return updated as MenuItem;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete menu item");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state — completely empty, no mock data
const initialState: {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
} = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems(state, action: PayloadAction<MenuItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchMenuItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMenuItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchMenuItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createMenuItem.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });

    // Update
    builder.addCase(updateMenuItem.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    // Toggle availability
    builder.addCase(toggleAvailability.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteMenuItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    });
  },
});

export const { setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;