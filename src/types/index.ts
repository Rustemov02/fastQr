export interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: string;
}