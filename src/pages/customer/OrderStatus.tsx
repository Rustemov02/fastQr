import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { fetchMultipleOrders } from "../../store/slices/orderSlice";
import type { Order } from "../../types";

const POLL_INTERVAL = 4000; // 4 seconds

const STATUS_CONFIG: Record<Order["status"], { emoji: string; label: string; color: string }> = {
  pending: {
    emoji: "🟡",
    label: "Sifarişiniz alındı, mətbəxə ötürüldü",
    color: "bg-yellow-50 border-yellow-300 text-yellow-800",
  },
  preparing: {
    emoji: "🔵",
    label: "Mətbəxdə hazırlanır...",
    color: "bg-blue-50 border-blue-300 text-blue-800",
  },
  ready: {
    emoji: "🟢",
    label: "Hazırdır! Masanıza təqdim olunur",
    color: "bg-green-50 border-green-300 text-green-800",
  },
  completed: {
    emoji: "⚪",
    label: "Təhvil verildi",
    color: "bg-gray-50 border-gray-300 text-gray-600",
  },
  cancelled: {
    emoji: "❌",
    label: "Ləğv edildi",
    color: "bg-red-50 border-red-300 text-red-800",
  },
};

// Helper to get active order IDs from localStorage
function getActiveOrderIds(): string[] {
  try {
    const stored = localStorage.getItem("activeOrderIds");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

// Helper to save active order IDs to localStorage
function saveActiveOrderIds(ids: string[]) {
  localStorage.setItem("activeOrderIds", JSON.stringify(ids));
}

export default function OrderStatus() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrders = useCallback(async () => {
    const ids = getActiveOrderIds();
    if (ids.length === 0) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const result = await dispatch(fetchMultipleOrders(ids)).unwrap();
      setOrders(result);
      setError(null);

      // Auto-cleanup: remove completed/cancelled orders from localStorage
      const activeIds = result
        .filter((o) => o.status !== "completed" && o.status !== "cancelled")
        .map((o) => o.id);
      saveActiveOrderIds(activeIds);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Initial fetch + start polling
  useEffect(() => {
    fetchOrders();

    pollingRef.current = setInterval(fetchOrders, POLL_INTERVAL);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [fetchOrders]);

  const handleClearCompleted = () => {
    const activeIds = orders
      .filter((o) => o.status !== "completed" && o.status !== "cancelled")
      .map((o) => o.id);
    saveActiveOrderIds(activeIds);
    setOrders((prev) => prev.filter((o) => o.status !== "completed" && o.status !== "cancelled"));
  };

  const handleAddOrder = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-headline-md font-bold text-primary">FastQR</div>
          <span className="text-sm text-on-surface-variant font-medium">
            Sifariş Statusu
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Loading State */}
        {loading && orders.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-on-surface-variant">Sifarişlər yüklənir...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-[56px] text-gray-300 mb-4">
              receipt_long
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
              Aktiv sifarişiniz yoxdur
            </h2>
            <p className="text-on-surface-variant mb-6">
              Yeni sifariş vermək üçün menyuya göz atın.
            </p>
            <button
              onClick={handleAddOrder}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg active:scale-[0.98] transition-transform"
            >
              Menyuya Get
            </button>
          </div>
        )}

        {/* Order Cards */}
        {orders.map((order, index) => {
          const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
          const totalItems = order.items.reduce((sum, ci) => sum + ci.quantity, 0);

          return (
            <div
              key={order.id}
              className={`rounded-2xl border-2 p-5 shadow-sm transition-all duration-500 ${config.color}`}
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config.emoji}</span>
                  <span className="font-bold text-lg">
                    Sifariş #{index + 1}
                  </span>
                </div>
                <span className="text-sm font-mono bg-white/60 px-2 py-1 rounded-lg">
                  #{order.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              {/* Table & Items Summary */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium">
                  Masa #{order.tableNumber}
                </span>
                <span className="text-sm opacity-75">
                  {totalItems} {totalItems === 1 ? "məhsul" : "məhsul"}
                </span>
                <span className="text-sm opacity-75">
                  {order.totalPrice.toFixed(2)} AZN
                </span>
              </div>

              {/* Status Label */}
              <div className="font-semibold text-base bg-white/40 rounded-xl px-4 py-2 backdrop-blur-sm">
                {config.emoji} {config.label}
              </div>

              {/* Order Items (collapsible) */}
              <details className="mt-3">
                <summary className="text-sm font-medium cursor-pointer opacity-70 hover:opacity-100">
                  Sifariş detalları
                </summary>
                <div className="mt-2 space-y-1.5 bg-white/40 rounded-xl p-3 backdrop-blur-sm">
                  {order.items.map((ci, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>
                        <span className="font-semibold">{ci.quantity}x</span>{" "}
                        {ci.item.name}
                      </span>
                      <span>{(ci.item.price * ci.quantity).toFixed(2)} AZN</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300/50 pt-1.5 mt-1.5 flex justify-between font-bold">
                    <span>Cəmi</span>
                    <span>{order.totalPrice.toFixed(2)} AZN</span>
                  </div>
                </div>
              </details>
            </div>
          );
        })}

        {/* Action Buttons */}
        {orders.length > 0 && (
          <div className="flex flex-col gap-3 pt-2 pb-8">
            <button
              onClick={handleAddOrder}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform"
            >
              + Yeni Sifariş Əlavə Et
            </button>

            {orders.some((o) => o.status === "completed" || o.status === "cancelled") && (
              <button
                onClick={handleClearCompleted}
                className="w-full py-3 bg-surface-container-high text-on-surface-variant rounded-xl font-medium active:scale-[0.98] transition-transform"
              >
                Bitmiş sifarişləri təmizlə
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}