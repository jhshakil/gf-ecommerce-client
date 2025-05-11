import api from "@/lib/axiosInstance";
import { Product, ProductFilter } from "@/types/product";

export const getProducts = async (
  filter?: ProductFilter
): Promise<Product[]> => {
  const response = await api.get("/products", { params: filter });
  return response.data;
};
