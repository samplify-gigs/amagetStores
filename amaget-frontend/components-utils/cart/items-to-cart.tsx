"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartState = CartItem[];

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "INCREASE_QTY"; payload: { id: string } }
  | { type: "DECREASE_QTY"; payload: { id: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "SET_CART"; payload: CartState };

type AddItemResult = "added" | "increased" | "max_reached";

interface CartContextValue {
  cart: CartState;
  addItem: (product: Product) => AddItemResult;
  increaseQty: (id: string) => AddItemResult;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  dispatch: React.Dispatch<CartAction>;
}

const MAX_QTY = 5;
const CART_STORAGE_KEY = "amaget_cart";

// ---------- Reducer ----------

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        return [...state, { ...action.payload, quantity: 1 }];
      }

      if (existingItem.quantity >= MAX_QTY) {
        return state;
      }

      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QTY) }
          : item,
      );
    }

    case "INCREASE_QTY": {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QTY) }
          : item,
      );
    }

    case "DECREASE_QTY": {
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }

    case "REMOVE_ITEM": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    case "SET_CART": {
      return action.payload;
    }

    default:
      return state;
  }
}

// ---------- Context ----------

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        dispatch({
          type: "SET_CART",
          payload: JSON.parse(stored) as CartState,
        });
      }
    } catch (err) {
      console.error("Failed to read cart from localStorage:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    console.log("cart updated:", cart);
  }, [cart, hydrated]);

  const addItem = (product: Product): AddItemResult => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing && existing.quantity >= MAX_QTY) {
      return "max_reached";
    }

    dispatch({ type: "ADD_ITEM", payload: product });
    return existing ? "increased" : "added";
  };

  const increaseQty = (id: string): AddItemResult => {
    const existing = cart.find((item) => item.id === id);
    if (!existing) return "added";

    if (existing.quantity >= MAX_QTY) {
      return "max_reached";
    }

    dispatch({ type: "INCREASE_QTY", payload: { id } });
    return "increased";
  };

  const decreaseQty = (id: string) => {
    dispatch({ type: "DECREASE_QTY", payload: { id } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, increaseQty, decreaseQty, removeItem, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
