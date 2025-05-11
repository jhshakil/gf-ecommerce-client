"use server";

import api from "@/lib/axiosInstance";
import { TCategory } from "@/types/category";

export const getCategoriesService = async (): Promise<
  TCategory[] | undefined
> => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
