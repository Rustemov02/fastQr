export default function AdminDashboard() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-inverse-surface border-r border-outline-variant flex flex-col gap-4 py-8 z-50">
        <div className="px-6 mb-8">
          <h1 className="text-[20px] font-black text-[#ffb59f]">FastQR Admin</h1>
          <p className="text-[#454749] text-[14px]">Kitchen Management</p>
        </div>
        <nav className="flex flex-col gap-2">
          <a
            className="text-[#ffb59f] border-l-4 border-[#ffb59f] pl-3 font-bold flex items-center gap-3 py-2 transition-all duration-150"
            href="#"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="text-[14px]">Menu</span>
          </a>
          <a
            className="text-[#454749] pl-4 hover:bg-[#e2e2e5]/10 flex items-center gap-3 py-2 transition-all duration-150"
            href="#"
          >
            <span className="material-symbols-outlined">category</span>
            <span className="text-[14px]">Categories</span>
          </a>
          <a
            className="text-[#454749] pl-4 hover:bg-[#e2e2e5]/10 flex items-center gap-3 py-2 transition-all duration-150"
            href="#"
          >
            <span className="material-symbols-outlined">table_restaurant</span>
            <span className="text-[14px]">Tables</span>
          </a>
          <a
            className="text-[#454749] pl-4 hover:bg-[#e2e2e5]/10 flex items-center gap-3 py-2 transition-all duration-150"
            href="#"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-[14px]">Sales</span>
          </a>
        </nav>
        <div className="mt-auto px-6 pt-4 border-t border-[#454749]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#d63c00] flex items-center justify-center text-[#fffbff]">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#ffffff]">Admin User</p>
              <p className="text-[10px] text-[#454749]">Store #402</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[240px] flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="h-20 px-8 flex items-center justify-between bg-surface shadow-sm sticky top-0 z-40">
          <h2 className="text-[32px] font-bold text-[#191c1d]">Menu Management</h2>
          <div className="flex items-center gap-4">
            <button className="bg-[#ab2e00] hover:bg-[#d63c00] text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200">
              <span className="material-symbols-outlined">add</span>
              <span>Add New Item</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {/* Filter Bar */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <button className="bg-[#d63c00] text-[#fffbff] px-6 py-2 rounded-full text-[12px] font-semibold">All Items</button>
            <button className="bg-[#e7e8e9] text-[#5c4038] px-6 py-2 rounded-full text-[12px] font-semibold hover:bg-[#e1e3e4] transition-colors">Main Course</button>
            <button className="bg-[#e7e8e9] text-[#5c4038] px-6 py-2 rounded-full text-[12px] font-semibold hover:bg-[#e1e3e4] transition-colors">Desserts</button>
            <button className="bg-[#e7e8e9] text-[#5c4038] px-6 py-2 rounded-full text-[12px] font-semibold hover:bg-[#e1e3e4] transition-colors">Beverages</button>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Item Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e1e3e4]/30 flex items-center gap-6 group hover:shadow-[0px_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkUrmH_lRB8mJI5v41xxZ25IMUmE7Misfh_OpGCFlLWR7qV-SPemzgKKYd0kMnGvWxpaG1cSyjH5HAFM7y98NSR7Q_x3FJjbbkWUQWU_cpjcnO_vagNObY4b3TpzoMmnR7bNYU91QHCskE0vxsAifB6PKaJf7pkKWPI4mnqW9cxFuOjLRbuI7zAvhum3wrByWE8MzDtbZj1qlHKbgvyyrhlL2FBv_IZcyRQ4tHLjdaTlfSp4FQVqM_"
                  alt="Signature Wagyu Burger"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-[#008735]/10 text-[#006b29] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">Main Course</span>
                    <h3 className="text-[20px] font-semibold text-[#191c1d]">Signature Wagyu Burger</h3>
                  </div>
                  <p className="text-[20px] font-semibold text-[#ab2e00]">18.00 AZN</p>
                </div>
                <p className="text-[#5c4038] text-[14px] mb-4 line-clamp-1">Truffle mayo, caramelized onions, aged cheddar, and house-made brioche.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-[#454749] hover:text-[#ab2e00] transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-[#454749] hover:text-[#ba1a1a] transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-[#5c4038]">Out of stock</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e1e3e4]/30 flex items-center gap-6 group hover:shadow-[0px_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4J1rTHuTjSYLhKZGpcK8ZyikhQkIEVsNd3wOMzfidDvvsPhcfC52MLhViEpeVO45v8drLQ3M42Gh53I7NP-9hKnaMrImb1SZN3GWJOykAfza2VtxrC4sFZ6hpEdxptgkd3ffY8OgETK7pZb9I0tsEQKSqg1uPzZhAQcbFleIz4l4bK9ZkBXTmT9WWKyVnmlKCrBBfO0TUcelkqSAfpzV5qUHU5DrVZTp-5fS_Fj0eaBIgXUpjJzTf"
                  alt="Traditional Saffron Kebab"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-[#008735]/10 text-[#006b29] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">Main Course</span>
                    <h3 className="text-[20px] font-semibold text-[#191c1d]">Traditional Saffron Kebab</h3>
                  </div>
                  <p className="text-[20px] font-semibold text-[#ab2e00]">24.50 AZN</p>
                </div>
                <p className="text-[#5c4038] text-[14px] mb-4 line-clamp-1">Premium lamb served with aromatic saffron rice and grilled tomatoes.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-[#454749] hover:text-[#ab2e00] transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-[#454749] hover:text-[#ba1a1a] transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-[#5c4038]">In stock</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e1e3e4]/30 flex items-center gap-6 group hover:shadow-[0px_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvwIB0YOXd7KSu3u_LFknM0Z03cqgYN9I_L_yez0qYupvFs14g3WjUGSNLV2ZfbHjuHaIDCu1RTgGT1aA_47PhfJaGErI2ML7u3adaEAvIXhxDSmFyuNmBGBYjtuLHxPrWjbz2XLEMB2CaAw2D-Ax84BY983hof0VrqSV_QLw7uiGOSjcpuVb62MQR0MRbtn0kY3mflHXIvdnojsJE2yP6cxyxAVP0ErbmTvT_FaxH9o0fDT8sjpPQ"
                  alt="Molten Fondant"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-[#008735]/10 text-[#006b29] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">Desserts</span>
                    <h3 className="text-[20px] font-semibold text-[#191c1d]">Molten Fondant</h3>
                  </div>
                  <p className="text-[20px] font-semibold text-[#ab2e00]">12.00 AZN</p>
                </div>
                <p className="text-[#5c4038] text-[14px] mb-4 line-clamp-1">70% dark chocolate with a warm flowing center and Tahitian vanilla.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-[#454749] hover:text-[#ab2e00] transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-[#454749] hover:text-[#ba1a1a] transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-[#5c4038]">Out of stock</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e1e3e4]/30 flex items-center gap-6 group hover:shadow-[0px_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrvtVVlIvWK8KxrL9XEQnF-5pPbjyWMYFKT9vV7O9vcovtTsWwgt7og7iUVl0eoEKSQRvxdYljTkp-WD5b1ykf1UA_QCJcRaWa6qlznXoCDCNmtxGURmorzvjElVj_qXbMEebpfU_U5CLDLTXDQ-DyUa2CLFgyGl8Jqu8K78dKqHRlbdKIDk7UlzM7xSIOQmyBZexSvJsisuOIaQ1157oxi0HKFiYlCT6JMxfz_m5h29Lfgc-hE_SX"
                  alt="Fresh Mint Mojito"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-[#008735]/10 text-[#006b29] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">Beverages</span>
                    <h3 className="text-[20px] font-semibold text-[#191c1d]">Fresh Mint Mojito</h3>
                  </div>
                  <p className="text-[20px] font-semibold text-[#ab2e00]">8.50 AZN</p>
                </div>
                <p className="text-[#5c4038] text-[14px] mb-4 line-clamp-1">Freshly squeezed lime, garden mint, and premium sparkling water.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-[#454749] hover:text-[#ab2e00] transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-[#454749] hover:text-[#ba1a1a] transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-[#5c4038]">Out of stock</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#e1e3e4] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1c1e] text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold opacity-60">Live Inventory</p>
                <h4 className="text-3xl font-bold mt-1">42</h4>
                <p className="text-[10px] mt-2 text-[#ffb59f]">↑ 4 items added today</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-20">inventory_2</span>
            </div>
            <div className="bg-[#d63c00] text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold opacity-60">Avg Order Value</p>
                <h4 className="text-3xl font-bold mt-1">32.40 AZN</h4>
                <p className="text-[10px] mt-2 text-[#fffbff]/80">Based on last 24h</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-20">payments</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#e1e3e4]/30 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold text-[#5c4038]">Out of Stock</p>
                <h4 className="text-3xl font-bold mt-1 text-[#ba1a1a]">3</h4>
                <p className="text-[10px] mt-2 text-[#454749]">Action required for 'Saffron Kebab'</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-[#ba1a1a]/20">warning</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}