import { useEffect, useState } from "react";

export default function KitchenDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const digitalTime = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="h-screen flex flex-col bg-[#1a1c1e] text-[#f8f9fa] font-['Inter'] overflow-hidden">
      {/* Top Bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 h-16 border-b border-[#e5beb3]/10 bg-[#2e3132]">
        <div className="flex items-center gap-6">
          <span className="text-[20px] font-bold text-[#ffb59f] tracking-tight">
            FastQR <span className="font-normal text-[#454749]">KDS</span>
          </span>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-[#e5beb3]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3ce36a] animate-pulse"></span>
            <span className="text-[12px] font-semibold text-[#3ce36a] tracking-wide uppercase">Live Connected</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[20px] font-bold text-[#fffbff]">{digitalTime}</span>
            <span className="text-[12px] font-semibold text-[#454749] uppercase">Kitchen Time</span>
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
            <h2 className="text-[20px] font-black text-[#ffb59f]">Kitchen Admin</h2>
            <p className="text-[12px] font-semibold text-[#454749]">Main Station</p>
          </div>
          <nav className="flex flex-col">
            <a
              className="text-[#ffb59f] border-l-4 border-[#ffb59f] pl-5 py-3 font-bold bg-[#d63c00]/10 flex items-center gap-3"
              href="#"
            >
              <span className="material-symbols-outlined fill-current">restaurant</span>
              Active Orders
            </a>
            <a className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150" href="#">
              <span className="material-symbols-outlined">history</span>
              Order History
            </a>
            <a className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150" href="#">
              <span className="material-symbols-outlined">inventory_2</span>
              Inventory
            </a>
            <a className="text-[#454749] pl-6 py-3 flex items-center gap-3 hover:bg-[#e2e2e5]/10 transition-all duration-150" href="#">
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
                <h1 className="text-[32px] font-bold text-[#fffbff]">Live Queue</h1>
                <p className="text-[#454749]">8 Orders in progress</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#e1e3e4]/10 px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:bg-[#e1e3e4]/20">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  All Stations
                </button>
                <button className="bg-[#e1e3e4]/10 px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-2 hover:bg-[#e1e3e4]/20">
                  <span className="material-symbols-outlined text-[18px]">sort</span>
                  Oldest First
                </button>
              </div>
            </div>

            {/* Order Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Card 1: Pending */}
              <div className="bg-[#2e3132] rounded-xl flex flex-col border border-[#e5beb3]/10 shadow-sm overflow-hidden min-h-[420px]">
                <div className="p-4 bg-black/10 border-b border-[#e5beb3]/5 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#454749] uppercase">Table 4</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8291</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#ffb59f] font-bold text-[20px]">12m</span>
                    <span className="text-[10px] uppercase font-bold text-[#454749]">Wait Time</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">Pending</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">2x</span>
                        <div>
                          <p className="font-bold text-[#fffbff] leading-tight">Adana Kebab</p>
                          <p className="text-[12px] text-[#ba1a1a]/80 italic font-medium">NO ONIONS</p>
                        </div>
                      </div>
                    </li>
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">1x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Shepherd Salad</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">3x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Ayran</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full bg-[#d63c00] text-[#fffbff] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Start Cooking
                  </button>
                </div>
              </div>

              {/* Card 2: Preparing (highlighted) */}
              <div className="bg-[#2e3132] rounded-xl flex flex-col border border-[#ffb59f]/30 shadow-lg overflow-hidden min-h-[420px] ring-1 ring-[#ffb59f]/20">
                <div className="p-4 bg-[#d63c00]/10 border-b border-[#e5beb3]/10 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#ffb59f] uppercase">Table 12</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8295</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#3ce36a] font-bold text-[20px]">05m</span>
                    <span className="text-[10px] uppercase font-bold text-[#454749] tracking-tighter">Cooking Time</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">Preparing</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">1x</span>
                        <div>
                          <p className="font-bold text-[#fffbff] leading-tight">Mixed Grill Platter</p>
                          <p className="text-[12px] text-[#454749] italic">Well Done</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#3ce36a]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3 text-[#454749]">
                        <span className="font-bold">2x</span>
                        <p className="font-bold leading-tight">Lentil Soup</p>
                      </div>
                      <span className="material-symbols-outlined opacity-20">circle</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full bg-[#008735] text-[#f7fff2] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">check</span>
                    Mark Ready
                  </button>
                </div>
              </div>

              {/* Card 3: Ready */}
              <div className="bg-[#2e3132] opacity-60 rounded-xl flex flex-col border border-[#e5beb3]/10 shadow-sm overflow-hidden min-h-[420px]">
                <div className="p-4 bg-[#008735]/10 border-b border-[#e5beb3]/5 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#454749] uppercase">Takeaway</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8288</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#454749] font-bold text-[20px]">24m</span>
                    <span className="text-[10px] uppercase font-bold text-[#454749]">Total</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#3ce36a]/20 text-[#3ce36a] border border-[#3ce36a]/30">Ready</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3 text-[#454749] line-through">
                        <span className="font-bold">4x</span>
                        <p className="font-bold leading-tight">Lahmacun</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full border border-[#e5beb3]/20 text-[#454749] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e1e3e4]/10 transition-all">
                    <span className="material-symbols-outlined">done_all</span>
                    Picked Up
                  </button>
                </div>
              </div>

              {/* Card 4: Pending (New) */}
              <div className="bg-[#2e3132] rounded-xl flex flex-col border border-[#e5beb3]/10 shadow-sm overflow-hidden min-h-[420px]">
                <div className="p-4 bg-black/10 border-b border-[#e5beb3]/5 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#454749] uppercase">Table 8</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8299</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#ba1a1a] font-bold text-[20px]">01m</span>
                    <span className="text-[10px] uppercase font-bold text-[#454749]">Just Now</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">Pending</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">1x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Beyti Sarma</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">2x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Kunefe</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full bg-[#d63c00] text-[#fffbff] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Start Cooking
                  </button>
                </div>
              </div>

              {/* Card 5: Preparing */}
              <div className="bg-[#2e3132] rounded-xl flex flex-col border border-[#e5beb3]/10 shadow-sm overflow-hidden min-h-[420px]">
                <div className="p-4 bg-[#d63c00]/10 border-b border-[#e5beb3]/5 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#454749] uppercase">Table 2</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8301</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#3ce36a] font-bold text-[20px]">08m</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">Preparing</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">5x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Falafel Wrap</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full bg-[#008735] text-[#f7fff2] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">check</span>
                    Mark Ready
                  </button>
                </div>
              </div>

              {/* Card 6: VIP Rush */}
              <div className="bg-[#2e3132] rounded-xl flex flex-col border-2 border-[#ba1a1a]/50 shadow-[0_0_20px_rgba(186,26,26,0.15)] overflow-hidden min-h-[420px]">
                <div className="p-4 bg-[#ffdad6]/5 border-b border-[#ba1a1a]/20 flex justify-between items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#ba1a1a] uppercase font-bold">VIP Room</span>
                    <h3 className="text-[20px] font-semibold text-[#fffbff]">#8305</h3>
                  </div>
                  <div className="flex flex-col items-end text-[#ba1a1a]">
                    <span className="font-bold text-[20px]">03m</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">RUSH</span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">Pending</span>
                    <span className="text-[#ba1a1a] material-symbols-outlined text-[16px]">priority_high</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">10x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Mixed Cold Meze</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#ffb59f]">10x</span>
                        <p className="font-bold text-[#fffbff] leading-tight">Chicken Shish</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 mt-auto">
                  <button className="w-full bg-[#ba1a1a] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#ba1a1a]/90 active:scale-95 transition-all">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    Prioritize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="flex-shrink-0 flex md:hidden justify-around items-center h-20 px-2 bg-[#2e3132] shadow-lg">
        <a className="flex flex-col items-center justify-center bg-[#d63c00] text-[#fffbff] rounded-xl p-2 w-16 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined fill-current">restaurant_menu</span>
          <span className="text-[12px] font-semibold">Live</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[12px] font-semibold">History</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined">shopping_basket</span>
          <span className="text-[12px] font-semibold">Stock</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#5c4038] p-2 w-16 hover:opacity-80 transition-transform active:scale-90" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[12px] font-semibold">Shift</span>
        </a>
      </nav>
    </div>
  );
}