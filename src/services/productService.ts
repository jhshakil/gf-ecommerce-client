"use server";

import api from "@/lib/axiosInstance";
import { TProduct, TProductFilter } from "@/types/product";

export const getProductsService = async (
  filter?: TProductFilter
): Promise<TProduct[] | undefined> => {
  try {
    const response = await api.get("/products", { params: filter });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductByIdService = async (
  id: number
): Promise<TProduct | undefined> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
