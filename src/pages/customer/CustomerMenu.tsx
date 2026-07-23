import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import CartDrawer from "../../components/customer/CartDrawer";
import OrderSuccessModal from "../../components/customer/OrderSuccessModal";

const categories = ["All", "Soups", "Kebabs", "Drinks", "Desserts", "Salads"];

export default function CustomerMenu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuItems = useAppSelector((state) => state.menu);
  const cartItems = useAppSelector((state) => state.cart.items);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);

  // On mount, check if there are active orders in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("activeOrderIds");
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids) && ids.length > 0) {
          setHasActiveOrders(true);
        }
      }
    } catch {}
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-sm flex justify-between items-center px-4 h-16">
        <div className="font-headline-md text-headline-md font-bold text-primary">
          FastQR
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-variant transition-colors duration-200">
            <span className="material-symbols-outlined text-primary">search</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full hover:bg-surface-variant transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-16 pt-4 pb-32">
        {/* Hero Section */}
        <section className="px-margin-mobile mb-6">
          <div className="relative overflow-hidden rounded-xl h-40 flex items-center p-6 text-on-primary-container bg-primary-container">
            <div className="z-10">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-1">Authentic Flavors</h1>
              <p className="font-body-md text-body-md opacity-90">
                Freshly prepared, delivered to your table in minutes.
              </p>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-20 transform rotate-12">
              <span className="material-symbols-outlined text-[120px]">restaurant</span>
            </div>
          </div>
        </section>

        {/* Active Orders Banner */}
        {hasActiveOrders && (
          <section className="px-margin-mobile mb-6">
            <button
              onClick={() => navigate("/order-status")}
              className="w-full flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 active:scale-[0.98] transition-transform hover:bg-blue-100"
            >
              <span className="material-symbols-outlined text-blue-500">receipt_long</span>
              <div className="flex-grow text-left">
                <p className="font-semibold">Aktiv sifarişləriniz var</p>
                <p className="text-sm text-blue-600">Statusu yoxlamaq üçün klikləyin</p>
              </div>
              <span className="material-symbols-outlined text-blue-400">arrow_forward</span>
            </button>
          </section>
        )}

        {/* Category Navigation */}
        <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-surface-variant">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-label-sm text-label-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Dish List */}
        <div className="px-margin-mobile mt-6 space-y-4">
          {filteredItems.map((dish) => {
            const cartItem = cartItems.find((ci) => ci.item.id === dish.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={dish.id}
                className={`flex bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low transition-transform active:scale-[0.98] ${
                  !dish.isAvailable ? "opacity-60" : ""
                }`}
              >
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={dish.image}
                    alt={dish.name}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      {dish.name}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary font-body-lg text-body-lg">
                      {dish.price.toFixed(2)} AZN
                    </span>
                    <div className="flex items-center gap-1">
                      {quantity > 0 && (
                        <button
                          onClick={() => dispatch(removeFromCart(dish.id))}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            remove
                          </span>
                        </button>
                      )}
                      {quantity > 0 && (
                        <span className="w-8 text-center font-bold text-on-surface text-body-md">
                          {quantity}
                        </span>
                      )}
                      <button
                        disabled={!dish.isAvailable}
                        onClick={() => dispatch(addToCart(dish))}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                          dish.isAvailable
                            ? "bg-primary text-on-primary active:bg-primary-container"
                            : "bg-surface-variant text-on-surface-variant cursor-not-allowed"
                        }`}
                      >
                        <span className="material-symbols-outlined">
                          {dish.isAvailable ? "add" : "block"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sticky Bottom Cart */}
      <div
        className={`fixed bottom-4 left-4 right-4 z-40 flex justify-center transition-all duration-300 ${
          totalItems > 0
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full max-w-md bg-zinc-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between active:scale-[0.98] transition-transform border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-900 font-bold">
                {totalItems}
              </span>
            </div>
            <span className="font-bold text-base">
              {totalItems} {totalItems === 1 ? "məhsul" : "məhsul"} • {totalPrice.toFixed(2)} AZN
            </span>
          </div>
          <div className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
            <span className="text-sm font-semibold">Səbətə Bax</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </div>
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderSuccess={() => setIsSuccessModalOpen(true)}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        order={currentOrder}
      />
    </>
  );
}