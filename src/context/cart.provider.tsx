"use client";

import {
  addToCartService,
  getCartService,
  removeFromCartService,
  updateCartItemService,
} from "@/services/CartService";
import { TCartItem } from "@/types/cart";
import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  cart: TCartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartService();
        if (cartData) setCart(cartData);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const updatedItem = await addToCartService(productId, quantity);
      if (updatedItem) {
        setCart((prevCart) => {
          const existingItem = prevCart.find(
            (item) => item.product.id === productId
          );
          if (existingItem) {
            return prevCart.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [...prevCart, updatedItem];
        });
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      throw error;
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    try {
      await updateCartItemService(productId, quantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update cart item", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await removeFromCartService(productId);
      setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== productId)
      );
    } catch (error) {
      console.error("Failed to remove from cart", error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
      throw error;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
