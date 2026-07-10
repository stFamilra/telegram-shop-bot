import { create } from "zustand";
import type { Product, CartItem } from "../types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    const existing = get().items.find((item) => item.product.id === product.id);
    if (existing) {
      // если уже есть, увеличиваем количество
      set({
        items: get().items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ items: [...get().items, { product, quantity: 1 }] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) });
  },

  clearCart: () => set({ items: [] }),

  increaseQuantity: (productId) => {
    set({
      items: get().items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    });
  },

  decreaseQuantity: (productId) => {
    const current = get().items.find((item) => item.product.id === productId);
    if (current && current.quantity === 1) {
      // если количество 1, удаляем товар
      set({
        items: get().items.filter((item) => item.product.id !== productId),
      });
    } else {
      set({
        items: get().items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      });
    }
  },

  total: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  },
}));
