import { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  toggleAvailability,
  deleteMenuItem,
} from "../../store/slices/menuSlice";
import MenuItemModal from "../../components/admin/MenuItemModal";
import type { MenuItem } from "../../types";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { items: menuItems, loading, error } = useAppSelector((state) => state.menu);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch menu items on mount
  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Get unique categories from items
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const outOfStockCount = menuItems.filter((item) => !item.isAvailable).length;

  // Open modal for adding a new item
  const handleAddNew = useCallback(() => {
    setEditingItem(null);
    setIsModalOpen(true);
  }, []);

  // Open modal for editing an item
  const handleEdit = useCallback((item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  }, []);

  // Save (create or update)
  const handleSave = useCallback(
    async (data: Partial<MenuItem>) => {
      setModalLoading(true);
      try {
        if (editingItem) {
          await dispatch(
            updateMenuItem({ id: editingItem._id, data })
          ).unwrap();
        } else {
          await dispatch(
            createMenuItem(data as Omit<MenuItem, "_id" | "id" | "createdAt" | "updatedAt">)
          ).unwrap();
        }
        setIsModalOpen(false);
        setEditingItem(null);
      } catch (err) {
        console.error("Save failed:", err);
      } finally {
        setModalLoading(false);
      }
    },
    [dispatch, editingItem]
  );

  // Toggle availability
  const handleToggleAvailability = useCallback(
    (item: MenuItem) => {
      dispatch(
        toggleAvailability({ id: item._id, isAvailable: !item.isAvailable })
      );
    },
    [dispatch]
  );

  // Delete item
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteMenuItem(id)).unwrap();
        setDeleteConfirm(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    },
    [dispatch]
  );

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#1a1c1e] border-r border-[#2c2e30] flex flex-col gap-4 py-8 z-50">
        <div className="px-6 mb-8">
          <h1 className="text-[20px] font-black text-[#ffb59f]">FastQR Admin</h1>
          <p className="text-[#6b6e72] text-[14px]">Menu Management</p>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          <a
            className="text-[#ffb59f] border-l-4 border-[#ffb59f] pl-3 font-bold flex items-center gap-3 py-2.5 transition-all duration-150 bg-[#2c2e30]/40 rounded-r-lg"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">restaurant</span>
            <span className="text-[14px]">Menu</span>
          </a>
          <a
            className="text-[#6b6e72] pl-4 hover:bg-[#2c2e30]/40 flex items-center gap-3 py-2.5 transition-all duration-150 rounded-r-lg"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">category</span>
            <span className="text-[14px]">Categories</span>
          </a>
          <a
            className="text-[#6b6e72] pl-4 hover:bg-[#2c2e30]/40 flex items-center gap-3 py-2.5 transition-all duration-150 rounded-r-lg"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
            <span className="text-[14px]">Tables</span>
          </a>
          <a
            className="text-[#6b6e72] pl-4 hover:bg-[#2c2e30]/40 flex items-center gap-3 py-2.5 transition-all duration-150 rounded-r-lg"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            <span className="text-[14px]">Sales</span>
          </a>
        </nav>
        <div className="mt-auto px-6 pt-4 border-t border-[#2c2e30]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#d63c00] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white">Admin User</p>
              <p className="text-[10px] text-[#6b6e72]">Store #402</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[240px] flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="h-20 px-8 flex items-center justify-between bg-white shadow-sm sticky top-0 z-40">
          <h2 className="text-[32px] font-bold text-[#191c1d]">Menu Management</h2>
          <button
            onClick={handleAddNew}
            className="bg-[#ab2e00] hover:bg-[#d63c00] text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add New Item</span>
          </button>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <svg
                className="animate-spin h-10 w-10 text-[#ab2e00]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-700 text-[14px]">{error}</p>
              <button
                onClick={() => dispatch(fetchMenuItems())}
                className="ml-auto text-red-600 underline text-[13px] font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Filter Bar */}
          {categories.length > 1 && (
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#d63c00] text-white"
                      : "bg-[#e7e8e9] text-[#5c4038] hover:bg-[#e1e3e4]"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 opacity-60">
                      ({menuItems.filter((i) => i.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-[64px] text-[#c4c6c8] mb-4">
                restaurant_menu
              </span>
              <h3 className="text-[20px] font-semibold text-[#5c4038] mb-2">
                {activeCategory === "All"
                  ? "No menu items yet"
                  : `No items in "${activeCategory}"`}
              </h3>
              <p className="text-[14px] text-[#6b6e72] mb-6">
                {activeCategory === "All"
                  ? "Add your first menu item to get started"
                  : "Try selecting a different category"}
              </p>
              {activeCategory === "All" && (
                <button
                  onClick={handleAddNew}
                  className="bg-[#ab2e00] hover:bg-[#d63c00] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add First Item
                </button>
              )}
            </div>
          )}

          {/* Menu Grid */}
          {!loading && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-xl shadow-[0px_2px_12px_rgba(0,0,0,0.06)] border border-[#e1e3e4]/50 flex items-center gap-5 group hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/200x200/e1e3e4/454749?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="min-w-0 flex-1 mr-3">
                        <span className="bg-[#008735]/10 text-[#006b29] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                          {item.category}
                        </span>
                        <h3 className="text-[18px] font-semibold text-[#191c1d] truncate">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-[18px] font-bold text-[#ab2e00] whitespace-nowrap">
                        {item.price.toFixed(2)} AZN
                      </p>
                    </div>

                    <p className="text-[#5c4038] text-[13px] mb-3 line-clamp-1">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg text-[#454749] hover:text-[#ab2e00] hover:bg-[#ab2e00]/5 transition-colors"
                          title="Edit item"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item._id)}
                          className="p-2 rounded-lg text-[#454749] hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/5 transition-colors"
                          title="Delete item"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>

                      {/* Availability Toggle */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[11px] font-semibold ${
                            item.isAvailable ? "text-[#006b29]" : "text-[#ba1a1a]"
                          }`}
                        >
                          {item.isAvailable ? "In stock" : "Out of stock"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isAvailable}
                            onChange={() => handleToggleAvailability(item)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ab2e00]" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          {!loading && menuItems.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#1a1c1e] text-white p-5 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold opacity-60">Total Items</p>
                  <h4 className="text-3xl font-bold mt-1">{menuItems.length}</h4>
                  <p className="text-[10px] mt-2 text-[#ffb59f]">
                    {categories.length - 1} categories
                  </p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-20">
                  inventory_2
                </span>
              </div>
              <div className="bg-[#d63c00] text-white p-5 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold opacity-60">Avg Price</p>
                  <h4 className="text-3xl font-bold mt-1">
                    {menuItems.length > 0
                      ? (
                          menuItems.reduce((sum, i) => sum + i.price, 0) /
                          menuItems.length
                        ).toFixed(2)
                      : "0.00"}{" "}
                    AZN
                  </h4>
                  <p className="text-[10px] mt-2 text-white/80">Across all items</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-20">
                  payments
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-[0px_2px_12px_rgba(0,0,0,0.06)] border border-[#e1e3e4]/50 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#5c4038]">
                    Out of Stock
                  </p>
                  <h4 className="text-3xl font-bold mt-1 text-[#ba1a1a]">
                    {outOfStockCount}
                  </h4>
                  <p className="text-[10px] mt-2 text-[#454749]">
                    {outOfStockCount > 0
                      ? "Action required"
                      : "All items available"}
                  </p>
                </div>
                <span className="material-symbols-outlined text-4xl text-[#ba1a1a]/20">
                  warning
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        item={editingItem}
        loading={modalLoading}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px] text-[#ba1a1a]">
                  delete_forever
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#191c1d] mb-2">
                Delete Menu Item?
              </h3>
              <p className="text-[13px] text-[#5c4038]">
                This action cannot be undone. The item will be permanently removed from the menu.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-[#e1e3e4] text-[#5c4038] font-semibold text-[14px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 rounded-xl bg-[#ba1a1a] text-white font-semibold text-[14px] hover:bg-[#d32f2f] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}