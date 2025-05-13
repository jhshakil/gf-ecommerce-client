"use server";

import api from "@/lib/axiosInstance";
import { TOrder } from "@/types/order";

export const checkoutService = async (): Promise<TOrder | undefined> => {
  try {
    const { data } = await api.post("/checkout");
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderHistoryService = async () => {
  try {
    const { data } = await api.get("/orders/history");
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrderStatusService = async (
  orderId: number,
  status: string
): Promise<TOrder | undefined> => {
  try {
    const { data } = await api.patch(`/orders/${orderId}/status`, { status });
    return data?.data;
  } catch (error) {
    console.error(error);
  }
};
