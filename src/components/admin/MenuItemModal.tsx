import { useState, useEffect } from "react";
import type { MenuItem } from "../../types";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MenuItem>) => void;
  item?: MenuItem | null;
  loading?: boolean;
}

const defaultForm = {
  name: "",
  description: "",
  price: 0,
  category: "Main Course",
  image: "",
  isAvailable: true,
};

const categories = [
  "Main Course",
  "Soups",
  "Kebabs",
  "Desserts",
  "Drinks",
  "Salads",
  "Appetizers",
];

export default function MenuItemModal({
  isOpen,
  onClose,
  onSave,
  item,
  loading,
}: MenuItemModalProps) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        isAvailable: item.isAvailable,
      });
    } else {
      setForm(defaultForm);
    }
  }, [item, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === "price") {
      setForm((prev) => ({ ...prev, price: parseFloat(value) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#191c1d]">
            {item ? "Edit Menu Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[#454749]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Margherita Pizza"
              className="w-full px-4 py-2.5 rounded-lg border border-[#e1e3e4] text-[14px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe the dish..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#e1e3e4] text-[14px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] transition-all resize-none"
            />
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
                Price (AZN) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-lg border border-[#e1e3e4] text-[14px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#e1e3e4] text-[14px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-lg border border-[#e1e3e4] text-[14px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] transition-all"
            />
            {form.image && (
              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-[#e1e3e4]">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[14px] font-semibold text-[#191c1d]">Available</p>
              <p className="text-[12px] text-[#5c4038]">
                Customers can order this item
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#e1e3e4] text-[#5c4038] font-semibold text-[14px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-[#ab2e00] text-white font-semibold text-[14px] hover:bg-[#d63c00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
              )}
              {item ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}