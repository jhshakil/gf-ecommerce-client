export type TOrderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export type TOrder = {
  id: number;
  total: number;
  status: TOrderStatus;
  createdAt: string;
  orderItem: Array<{
    id: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
    };
  }>;
};
