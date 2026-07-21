import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../types";

const initialState: MenuItem[] = [
  {
    id: "1",
    name: "Adana Kebab",
    description: "Spiced hand-minced meat grilled on wide iron skewers.",
    price: 12.0,
    category: "Kebabs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxGIGUvwEERB-JiXaFbsd-hOAE3JJOt1vFoo3umi2ewjI8Wea4fMse6i7QoquhgCZWgUNSXIat7Fx5cEZtsz0HekipNNE1bXSwX068BqdaPzPcQKZyqUaMvBuGDH2Xa57qApc7Ch3DWDFw4vwBQ94NvCtGhhRjXjvKwLJbafg5VWITqq99q9wC6HwS8Gc7-jkvi60GC532WVF6xKs3SG2SGxxL4ECzKrbYxPE1QEEpd7GVs2yw9vWi",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Lentil Soup",
    description: "Traditional Turkish style with lemon and croutons.",
    price: 4.5,
    category: "Soups",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1dDBlGX0BnGDlZ4NAyyHCo2ePdxUghwbhGiWZwrZ4CgPeXhFZnv4Eatbq-qwSHglOTrfxL_vR3sWiYb3rjE1NPR08wuKzpfSVkjG9CcJ9jdAPuperST9gsYtBQBBjnnreS0Ish_9MC-vjPKq3F__4jM7WxLamEkEpmL2RLDo7kUqGUBoVwAdhB3T2k34zXkpxBqRPDHIMkBZriv-yGBe9hJY6zREJNh7D2YRahDAQ_V3olGbzHSwu",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Pistachio Baklava",
    description: "Four layers of flaky pastry with premium Antep pistachios.",
    price: 6.5,
    category: "Desserts",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcbCcGG1yxw0QBW7Qo9dyzIyceWjIbVkNTcCuTh4M__PB3ULLwmUmW6tPxQme8exqz1tbIkWACPp3GAP9KruQouce1by8ZIA5_DPGNbEGWcq8TJuuv9zTYozDQ6iwD1DznrfkFBBpXvbaDS6VPlEV421y2n89hDadptlepcFVaZUMQZHyD1G7VYxbYI8hcyjhZJb4wMl_oRIpaB59eJr0TDiviPo2J5qsxNhjWefFaLtj1bIFkKCA",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Fresh Lemonade",
    description: "Homemade with organic lemons and fresh mint.",
    price: 3.5,
    category: "Drinks",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyj9FMFyeXmuchyyMp_n52skC2-Zl1WNXkm5zEV5xHHWZKvS73gBJ79LiCMzgrq_tYdtkA9t_2zN-Rz04WbFb23H5LgTHJnJIFm1WPhF9bIdZ_sFToJd_n6En1Mh9sasVTt2p0ob2a2rlXLaaexkx3cIq3ueIudcZJUcpTS0L2G0aCrTr235WM6_rFwa67s4B164iWNNpgJBg8d7jxVHMHpDoAwI4T_vXhinGJwIBeNJql3VHo6Ifo",
    isAvailable: false,
  },
  {
    id: "5",
    name: "Shepherd Salad",
    description: "Fresh tomatoes, cucumbers, onions, and parsley with pomegranate molasses.",
    price: 5.5,
    category: "Salads",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrvtVVlIvWK8KxrL9XEQnF-5pPbjyWMYFKT9vV7O9vcovtTsWwgt7og7iUVl0eoEKSQRvxdYljTkp-WD5b1ykf1UA_QCJcRaWa6qlznXoCDCNmtxGURmorzvjElVj_qXbMEebpfU_U5CLDLTXDQ-DyUa2CLFgyGl8Jqu8K78dKqHRlbdKIDk7UlzM7xSIOQmyBZexSvJsisuOIaQ1157oxi0HKFiYlCT6JMxfz_m5h29Lfgc-hE_SX",
    isAvailable: true,
  },
];

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleAvailability(state, action: PayloadAction<string>) {
      const item = state.find((menuItem) => menuItem.id === action.payload);
      if (item) {
        item.isAvailable = !item.isAvailable;
      }
    },
    setMenuItems(_state, action: PayloadAction<MenuItem[]>) {
      return action.payload;
    },
  },
});

export const { toggleAvailability, setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;