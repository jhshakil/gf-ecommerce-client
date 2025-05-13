"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.provider";
import { getOrderHistoryService } from "@/services/OrderService";
import { TOrder } from "@/types/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const data = await getOrderHistoryService();
        console.log(data);
        if (data) setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast("Failed to fetch orders");
      } finally {
        setIsLoading(false);
        toast("Successfully fetch Orders");
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Please log in to view this page</h1>
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Log In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">Order History</h1>

      {orders?.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            You have not placed any orders yet.
          </p>
          <Button className="mt-4" onClick={() => router.push("/products")}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="rounded-lg border p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <h4 className="mb-2 text-sm font-medium">Items</h4>
                <ul className="space-y-2">
                  {order?.orderItem?.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
