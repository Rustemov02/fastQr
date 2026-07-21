const categories = ["Soups", "Kebabs", "Drinks", "Desserts", "Salads"]

const dishes = [
  {
    name: "Lentil Soup",
    description: "Traditional Turkish style with lemon and croutons.",
    price: "4.50 AZN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1dDBlGX0BnGDlZ4NAyyHCo2ePdxUghwbhGiWZwrZ4CgPeXhFZnv4Eatbq-qwSHglOTrfxL_vR3sWiYb3rjE1NPR08wuKzpfSVkjG9CcJ9jdAPuperST9gsYtBQBBjnnreS0Ish_9MC-vjPKq3F__4jM7WxLamEkEpmL2RLDo7kUqGUBoVwAdhB3T2k34zXkpxBqRPDHIMkBZriv-yGBe9hJY6zREJNh7D2YRahDAQ_V3olGbzHSwu",
  },
  {
    name: "Adana Kebab",
    description: "Spiced hand-minced meat grilled on wide iron skewers.",
    price: "12.00 AZN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxGIGUvwEERB-JiXaFbsd-hOAE3JJOt1vFoo3umi2ewjI8Wea4fMse6i7QoquhgCZWgUNSXIat7Fx5cEZtsz0HekipNNE1bXSwX068BqdaPzPcQKZyqUaMvBuGDH2Xa57qApc7Ch3DWDFw4vwBQ94NvCtGhhRjXjvKwLJbafg5VWITqq99q9wC6HwS8Gc7-jkvi60GC532WVF6xKs3SG2SGxxL4ECzKrbYxPE1QEEpd7GVs2yw9vWi",
  },
  {
    name: "Fresh Lemonade",
    description: "Homemade with organic lemons and fresh mint.",
    price: "3.50 AZN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyj9FMFyeXmuchyyMp_n52skC2-Zl1WNXkm5zEV5xHHWZKvS73gBJ79LiCMzgrq_tYdtkA9t_2zN-Rz04WbFb23H5LgTHJnJIFm1WPhF9bIdZ_sFToJd_n6En1Mh9sasVTt2p0ob2a2rlXLaaexkx3cIq3ueIudcZJUcpTS0L2G0aCrTr235WM6_rFwa67s4B164iWNNpgJBg8d7jxVHMHpDoAwI4T_vXhinGJwIBeNJql3VHo6Ifo",
  },
  {
    name: "Pistachio Baklava",
    description: "Four layers of flaky pastry with premium Antep pistachios.",
    price: "6.50 AZN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcbCcGG1yxw0QBW7Qo9dyzIyceWjIbVkNTcCuTh4M__PB3ULLwmUmW6tPxQme8exqz1tbIkWACPp3GAP9KruQouce1by8ZIA5_DPGNbEGWcq8TJuuv9zTYozDQ6iwD1DznrfkFBBpXvbaDS6VPlEV421y2n89hDadptlepcFVaZUMQZHyD1G7VYxbYI8hcyjhZJb4wMl_oRIpaB59eJr0TDiviPo2J5qsxNhjWefFaLtj1bIFkKCA",
  },
];

export default function CustomerMenu() {
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
          <button className="p-2 rounded-full hover:bg-surface-variant transition-colors duration-200">
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-16 pt-4">
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

        {/* Category Navigation */}
        <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-surface-variant">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-label-sm text-label-sm transition-all duration-200 ${
                  index === 0
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
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="flex bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low transition-transform active:scale-[0.98]"
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
                    {dish.price}
                  </span>
                  <button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md active:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Cart */}
      <div className="fixed bottom-6 left-margin-mobile right-margin-mobile z-50">
        <button className="w-full h-16 bg-on-background text-background rounded-2xl flex items-center justify-between px-6 shadow-2xl transition-transform active:scale-95 group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-on-background font-bold">
                2
              </span>
            </div>
            <div className="text-left">
              <span className="font-label-sm text-label-sm block opacity-70">
                Cart (2 items)
              </span>
              <span className="font-headline-md text-headline-md block leading-tight">
                16.50 AZN
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <span className="font-label-sm text-label-sm">View Cart</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </button>
      </div>
    </>
  );
}