"use server";

import api from "@/lib/axiosInstance";
import { TCartItem } from "@/types/cart";

export const getCartService = async (): Promise<TCartItem[] | undefined> => {
  try {
    const { data } = await api.get("/cart");
    return data?.data?.cartItem;
  } catch (error) {
    console.error(error);
  }
};

export const addToCartService = async (
  productId: number,
  quantity: number
): Promise<TCartItem | undefined> => {
  try {
    const { data } = await api.post("/cart", { productId, quantity });
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItemService = async (
  productId: number,
  quantity: number
): Promise<TCartItem | undefined> => {
  try {
    const { data } = await api.patch(`/cart/${productId}`, { quantity });
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCartService = async (
  productId: number
): Promise<void> => {
  try {
    await api.delete(`/cart/${productId}`);
  } catch (error) {
    console.error(error);
  }
};

export const clearCartService = async (): Promise<void> => {
  try {
    await api.put("/cart/clear");
  } catch (error) {
    console.error(error);
  }
};
