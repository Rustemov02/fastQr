import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchOrders, updateOrderStatus } from "../../store/slices/orderSlice";
import type { Order } from "../../types";

/** Compute elapsed minutes from createdAt to now */
function getElapsedMinutes(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return Math.floor((now - created) / 60000);
}

/** Format a duration in minutes to a display string */
function formatDuration(minutes: number): string {
  if (minutes < 1) return "<1m";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

/** Human-readable label for an elapsed duration */
function elapsedLabel(minutes: number, status: string): string {
  if (status === "pending") return "Wait Time";
  if (status === "preparing") return "Cooking Time";
  return "Total";
}

/** Colour class for the elapsed time text based on context */
function elapsedColor(minutes: number, status: string): string {
  if (status === "ready") return "text-[#454749]";
  if (status === "pending" && minutes > 15) return "text-[#ba1a1a]";
  if (status === "preparing") return "text-[#3ce36a]";
  return "text-[#ffb59f]";
}

/** Status badge configuration */
const statusBadgeConfig: Record<
  Order["status"],
  { label: string; classes: string }
> = {
  pending: {
    label: "Pending",
    classes:
      "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  preparing: {
    label: "Preparing",
    classes: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  ready: {
    label: "Ready",
    classes: "bg-[#3ce36a]/20 text-[#3ce36a] border-[#3ce36a]/30",
  },
  completed: {
    label: "Completed",
    classes: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

interface ActionButton {
  label: string;
  icon: string;
  classes: string;
  nextStatus: Order["status"];
}

/** Determine which action button to show for a given order status */
function getAction(order: Order): ActionButton | null {
  switch (order.status) {
    case "pending":
      return {
        label: "Start Cooking",
        icon: "play_arrow",
        classes:
          "w-full bg-[#d63c00] text-[#fffbff] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all",
        nextStatus: "preparing",
      };
    case "preparing":
      return {
        label: "Mark Ready",
        icon: "check",
        classes:
          "w-full bg-[#008735] text-[#f7fff2] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all",
        nextStatus: "ready",
      };
    case "ready":
      return {
        label: "Picked Up",
        icon: "done_all",
        classes:
          "w-full border border-[#e5beb3]/20 text-[#454749] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e1e3e4]/10 transition-all",
        nextStatus: "completed",
      };
    default:
      return null;
  }
}

/** Card border/ring styling based on status */
function cardBorderClasses(status: Order["status"]): string {
  if (status === "preparing")
    return "border border-[#ffb59f]/30 shadow-lg ring-1 ring-[#ffb59f]/20";
  if (status === "ready") return "border border-[#e5beb3]/10 shadow-sm opacity-60";
  return "border border-[#e5beb3]/10 shadow-sm";
}

function cardHeaderBg(status: Order["status"]): string {
  if (status === "preparing") return "bg-[#d63c00]/10";
  if (status === "ready") return "bg-[#008735]/10";
  return "bg-black/10";
}

export default function KitchenDashboard() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [time, setTime] = useState(new Date());

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll orders every 5 seconds
  useEffect(() => {
    dispatch(fetchOrders());
    const interval = setInterval(() => {
      dispatch(fetchOrders());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Force re-render every 30s to keep elapsed times fresh
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = useCallback(
    (order: Order, nextStatus: Order["status"]) => {
      dispatch(updateOrderStatus({ id: order.id, status: nextStatus }));
    },
    [dispatch]
  );

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const digitalTime = `${hours}:${minutes}:${seconds}`;

  const activeOrders = orders.filter((o) => o.status !== "completed");

  return (
    <div className="h-screen flex flex-col bg-[#1a1c1e] text-[#f8f9fa] font-['Inter'] overflow-hidden">
      {/* Top Bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 h-16 border-b border-[#e5beb3]/10 bg-[#2e3132]">
        <div className="flex items-center gap-6">
          <span className="text-[20px] font-bold text-[#ffb59f] tracking-tight">
            FastQR{" "}
            <span className="font-normal text-[#454749]">KDS</span>
          </span>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-[#e5beb3]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3ce36a] animate-pulse"></span>
            <span className="text-[12px] font-semibold text-[#3ce36a] tracking-wide uppercase">
              Live Connected
            </span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[20px] font-bold text-[#fffbff]">
              {digitalTime}
            </span>
            <span className="text-[12px] font-semibold text-[#454749] uppercase">
              Kitchen Time
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-[#e1e3e4]/10 text-[#f8f9fa] hover:bg-[#e1e3e4]/20 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="p-2 rounded-xl bg-[#e1e3e4]/10 text-[#f8f9fa] hover:bg-[#e1e3e4]/20 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </header>

      {/* Side + Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[240px] border-r border-[#e5beb3]/10 bg-[#2e3132] pt-6">
          <div className="px-6 mb-4">
            <h2 className="text-[20px] font-black text-[#ffb59f]">
              Kitchen Admin
            </h2>
            <p className="text-[12px] font-semibold text-[#454749]">
              Main Station
            </p>
          </div>
          <nav className="flex flex-col">
            <a
              className="text-[#ffb59f] border-l-4 border-[#ffb59f] pl-5 py-3 font-bold bg-[#d63c00]/10 flex items-center gap-3"
              href="#"
            >
              <span className="material-symbols-outlined fill-current">
                restaurant
              </span>
              Active Orders
            </a>
            <a
              className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150"
              href="#"
            >
              <span className="material-symbols-outlined">history</span>
              Order History
            </a>
            <a
              className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150"
              href="#"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Inventory
            </a>
            <a
              className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              Analytics
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[32px] font-bold text-[#fffbff]">
                  Live Queue
                </h1>
                <p className="text-[#454749]">
                  {activeOrders.length}{" "}
                  {activeOrders.length === 1
                    ? "Order"
                    : "Orders"}{" "}
                  in progress
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#e1e3e4]/10 px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:bg-[#e1e3e4]/20">
                  <span className="material-symbols-outlined text-[18px]">
                    filter_list
                  </span>
                  All Stations
                </button>
                <button className="bg-[#e1e3e4]/10 px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:bg-[#e1e3e4]/20">
                  <span className="material-symbols-outlined text-[18px]">
                    sort
                  </span>
                  Oldest First
                </button>
              </div>
            </div>

            {/* Order Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeOrders.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#454749]">
                  <span className="material-symbols-outlined text-[64px] mb-4">
                    restaurant
                  </span>
                  <p className="text-[20px] font-semibold">
                    No active orders
                  </p>
                  <p className="text-[14px]">
                    New orders will appear here automatically
                  </p>
                </div>
              ) : (
                activeOrders.map((order) => {
                  const elapsed = getElapsedMinutes(order.createdAt);
                  const badge = statusBadgeConfig[order.status] ?? statusBadgeConfig.pending;
                  const action = getAction(order);

                  return (
                    <div
                      key={order.id}
                      className={`bg-[#2e3132] rounded-xl flex flex-col ${cardBorderClasses(
                        order.status
                      )} overflow-hidden min-h-[420px]`}
                    >
                      <div
                        className={`p-4 ${cardHeaderBg(
                          order.status
                        )} border-b border-[#e5beb3]/5 flex justify-between items-start`}
                      >
                        <div>
                          <span className="text-[12px] font-semibold text-[#454749] uppercase">
                            {order.tableNumber
                              ? `Table ${order.tableNumber}`
                              : "Takeaway"}
                          </span>
                          <h3 className="text-[20px] font-semibold text-[#fffbff]">
                            #{order.id.slice(-4).toUpperCase()}
                          </h3>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`font-bold text-[20px] ${elapsedColor(
                              elapsed,
                              order.status
                            )}`}
                          >
                            {formatDuration(elapsed)}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-[#454749]">
                            {elapsedLabel(elapsed, order.status)}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1">
                        <div className="mb-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badge.classes}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <ul className="space-y-3">
                          {order.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between items-start"
                            >
                              <div className="flex gap-3">
                                <span className="font-bold text-[#ffb59f]">
                                  {item.quantity}x
                                </span>
                                <p className="font-bold text-[#fffbff] leading-tight">
                                  {item.item.name}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {action && (
                        <div className="p-4 mt-auto">
                          <button
                            onClick={() =>
                              handleStatusChange(order, action.nextStatus)
                            }
                            className={action.classes}
                          >
                            <span className="material-symbols-outlined">
                              {action.icon}
                            </span>
                            {action.label}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="flex-shrink-0 flex md:hidden justify-around items-center h-20 px-2 bg-[#2e3132] shadow-lg">
        <a
          className="flex flex-col items-center justify-center bg-[#d63c00] text-[#fffbff] rounded-xl p-2 w-16 transition-transform active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined fill-current">
            restaurant_menu
          </span>
          <span className="text-[12px] font-semibold">Live</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[12px] font-semibold">History</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="text-[12px] font-semibold">Stock</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[12px] font-semibold">Shift</span>
        </a>
      </nav>
    </div>
  );
}