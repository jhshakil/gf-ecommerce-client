"use server";

import api from "@/lib/axiosInstance";
import { TProduct, TProductFilter } from "@/types/product";

export const getProductsService = async (
  filter?: TProductFilter
): Promise<TProduct[] | undefined> => {
  try {
    const { data } = await api.get("/products", { params: filter });
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductByIdService = async (
  id: number
): Promise<TProduct | undefined> => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};
