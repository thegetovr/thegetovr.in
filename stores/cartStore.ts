import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, ReadyMadeCartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];
  readyMadeItems: ReadyMadeCartItem[];
  addReadyMadeItem: (item: ReadyMadeCartItem) => void;

  removeReadyMadeItem: (id: string) => void;

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
      readyMadeItems: [],
      addReadyMadeItem: (item) =>
        set((state) => {
          const existing = state.readyMadeItems.find(
            (cartItem) => cartItem.productId === item.productId,
          );

          if (existing) {
            return {
              readyMadeItems: state.readyMadeItems.map((cartItem) =>
                cartItem.productId === item.productId
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + item.quantity,
                      totalPrice:
                        cartItem.unitPrice *
                        (cartItem.quantity + item.quantity),
                    }
                  : cartItem,
              ),
            };
          }

          return {
            readyMadeItems: [...state.readyMadeItems, item],
          };
        }),

      removeReadyMadeItem: (id) =>
        set((state) => ({
          readyMadeItems: state.readyMadeItems.filter((item) => item.id !== id),
        })),

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.unitPrice * (item.quantity + 1),
                }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                  totalPrice: item.unitPrice * Math.max(1, item.quantity - 1),
                }
              : item,
          ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "thegetovr-cart",
    },
  ),
);
