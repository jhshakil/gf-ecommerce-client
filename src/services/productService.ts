"use server";

import api from "@/lib/axiosInstance";
import { TProduct, TProductFilter } from "@/types/product";

type ProductsResponse = {
  data: TProduct[];
  total: number;
};

export const getProductsService = async (
  filter?: TProductFilter
): Promise<ProductsResponse | undefined> => {
  try {
    const { data } = await api.get("/products", { params: filter });
    return {
      data: data?.data?.products,
      total: data?.data?.total,
    };
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
