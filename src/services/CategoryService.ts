"use server";

import api from "@/lib/axiosInstance";
import { TCategory } from "@/types/category";

export const getCategoriesService = async (): Promise<
  TCategory[] | undefined
> => {
  try {
    const { data } = await api.get("/categories");
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};
