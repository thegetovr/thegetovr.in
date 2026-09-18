import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, ReadyMadeCartItem } from "@/types/cart";

interface SavedCart {
  items: CartItem[];
  readyMadeItems: ReadyMadeCartItem[];
}

interface CartStore {
  items: CartItem[];
  readyMadeItems: ReadyMadeCartItem[];

  activeUserId: string | null;
  accounts: Record<string, SavedCart>;

  addItem: (item: CartItem) => void;
  addReadyMadeItem: (item: ReadyMadeCartItem) => void;

  removeItem: (id: string) => void;
  removeReadyMadeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  activateAccount: (userId: string) => void;
  deactivateAccount: () => void;
}

const emptyCart = (): SavedCart => ({
  items: [],
  readyMadeItems: [],
});

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      readyMadeItems: [],

      activeUserId: null,
      accounts: {},

      // =====================================================
      // ACTIVATE ACCOUNT
      // =====================================================

      activateAccount: (userId) =>
        set((state) => {
          const savedCart = state.accounts[userId] ?? emptyCart();

          return {
            activeUserId: userId,
            items: savedCart.items,
            readyMadeItems: savedCart.readyMadeItems,
          };
        }),

      // =====================================================
      // DEACTIVATE ACCOUNT
      // =====================================================

      deactivateAccount: () =>
        set({
          activeUserId: null,
          items: [],
          readyMadeItems: [],
        }),

      // =====================================================
      // ADD READY-MADE ITEM
      // =====================================================

      addReadyMadeItem: (item) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const existing = state.readyMadeItems.find(
            (cartItem) => cartItem.productId === item.productId,
          );

          const updatedReadyMadeItems = existing
            ? state.readyMadeItems.map((cartItem) =>
                cartItem.productId === item.productId
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + item.quantity,
                      totalPrice:
                        cartItem.unitPrice *
                        (cartItem.quantity + item.quantity),
                    }
                  : cartItem,
              )
            : [...state.readyMadeItems, item];

          return {
            readyMadeItems: updatedReadyMadeItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: state.items,
                readyMadeItems: updatedReadyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // REMOVE READY-MADE ITEM
      // =====================================================

      removeReadyMadeItem: (id) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const updatedReadyMadeItems = state.readyMadeItems.filter(
            (item) => item.id !== id,
          );

          return {
            readyMadeItems: updatedReadyMadeItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: state.items,
                readyMadeItems: updatedReadyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // ADD CUSTOM ITEM
      // =====================================================

      addItem: (item) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const updatedItems = [...state.items, item];

          return {
            items: updatedItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: updatedItems,
                readyMadeItems: state.readyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // REMOVE CUSTOM ITEM
      // =====================================================

      removeItem: (id) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const updatedItems = state.items.filter((item) => item.id !== id);

          return {
            items: updatedItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: updatedItems,
                readyMadeItems: state.readyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // INCREASE QUANTITY
      // =====================================================

      increaseQuantity: (id) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const updatedItems = state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.unitPrice * (item.quantity + 1),
                }
              : item,
          );

          const updatedReadyMadeItems = state.readyMadeItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.unitPrice * (item.quantity + 1),
                }
              : item,
          );

          return {
            items: updatedItems,
            readyMadeItems: updatedReadyMadeItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: updatedItems,
                readyMadeItems: updatedReadyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // DECREASE QUANTITY
      // =====================================================

      decreaseQuantity: (id) =>
        set((state) => {
          if (!state.activeUserId) {
            return state;
          }

          const updatedItems = state.items.map((item) => {
            if (item.id !== id) {
              return item;
            }

            const quantity = Math.max(1, item.quantity - 1);

            return {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            };
          });

          const updatedReadyMadeItems = state.readyMadeItems.map((item) => {
            if (item.id !== id) {
              return item;
            }

            const quantity = Math.max(1, item.quantity - 1);

            return {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            };
          });

          return {
            items: updatedItems,
            readyMadeItems: updatedReadyMadeItems,

            accounts: {
              ...state.accounts,
              [state.activeUserId]: {
                items: updatedItems,
                readyMadeItems: updatedReadyMadeItems,
              },
            },
          };
        }),

      // =====================================================
      // CLEAR CURRENT ACCOUNT CART
      // =====================================================

      clearCart: () =>
        set((state) => {
          if (!state.activeUserId) {
            return {
              items: [],
              readyMadeItems: [],
            };
          }

          return {
            items: [],
            readyMadeItems: [],

            accounts: {
              ...state.accounts,
              [state.activeUserId]: emptyCart(),
            },
          };
        }),
    }),
    {
      name: "thegetovr-cart-v3",
    },
  ),
);
