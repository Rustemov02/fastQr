import { useAppSelector, useAppDispatch } from "../../store";
import { addToCart, removeFromCart, clearCart } from "../../store/slices/cartSlice";
import { createOrder } from "../../store/slices/orderSlice";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export default function CartDrawer({ isOpen, onClose, onOrderSuccess }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  if (!isOpen) return null;

  const handlePlaceOrder = async () => {
    try {
      const result = await dispatch(
        createOrder({
          tableNumber: 5,
          items: cartItems,
          totalPrice,
        })
      ).unwrap();

      if (result) {
        dispatch(clearCart());
        onClose();
        onOrderSuccess();
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-[85%] max-w-sm bg-surface h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-surface-variant flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <h2 className="font-headline-md text-headline-md">Səbətim</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-40">
                shopping_bag
              </span>
              <p className="font-headline-md text-headline-md">Səbətiniz boşdur</p>
              <p className="text-sm mt-1">Dadlı yeməklər sizi gözləyir!</p>
            </div>
          ) : (
            cartItems.map((ci) => (
              <div
                key={ci.item.id}
                className="flex gap-3 bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-surface-container-low"
              >
                <img
                  alt={ci.item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                  src={ci.item.image}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-on-surface">{ci.item.name}</h4>
                    <button
                      onClick={() => {
                        for (let i = 0; i < ci.quantity; i++) {
                          dispatch(removeFromCart(ci.item.id));
                        }
                      }}
                      className="text-on-surface-variant opacity-60 hover:text-error"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-primary font-bold">
                      {ci.item.price.toFixed(2)} AZN
                    </span>
                    <div className="flex items-center gap-3 bg-surface-container-high rounded-full px-2 py-1">
                      <button
                        onClick={() => dispatch(removeFromCart(ci.item.id))}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          remove
                        </span>
                      </button>
                      <span className="font-bold text-sm">{ci.quantity}</span>
                      <button
                        onClick={() => dispatch(addToCart(ci.item))}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-surface-variant bg-surface space-y-4">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-label-sm">
                Masa #5
              </span>
              <div className="text-right">
                <span className="text-on-surface-variant text-sm block">Cəmi:</span>
                <span className="text-headline-md font-bold text-on-surface">
                  {totalPrice.toFixed(2)} AZN
                </span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform"
            >
              Sifarişi Təsdiqlə
            </button>
          </div>
        )}
      </div>
    </div>
  );
}