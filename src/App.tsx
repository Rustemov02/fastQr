import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerMenu from "./pages/customer/CustomerMenu";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;