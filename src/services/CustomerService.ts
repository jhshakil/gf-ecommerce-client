"use server";

import api from "@/lib/axiosInstance";
import { TCustomerData } from "@/types/auth";

export const getCustomerService = async (): Promise<
  TCustomerData | undefined
> => {
  try {
    const { data } = await api.get("/customers");
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomerService = async (
  payload: Partial<TCustomerData>
): Promise<TCustomerData | undefined> => {
  try {
    const { data } = await api.patch(`/customers`, payload);
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};
