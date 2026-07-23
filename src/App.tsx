import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerMenu from "./pages/customer/CustomerMenu";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";
import OrderStatus from "./pages/customer/OrderStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;