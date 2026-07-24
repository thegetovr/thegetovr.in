import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice:
                    item.unitPrice * (item.quantity + 1),
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                  totalPrice:
                    item.unitPrice *
                    Math.max(1, item.quantity - 1),
                }
              : item
          ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "thegetovr-cart",
    }
  )
);