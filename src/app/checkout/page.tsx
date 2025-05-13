"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth.provider";
import { useCart } from "@/context/cart.provider";
import { updateCustomerService } from "@/services/CustomerService";
import { checkoutService } from "@/services/OrderService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { customer } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: customer?.phone || "",
    address: customer?.address || "",
    city: customer?.city || "",
    zipCode: customer?.zipCode || "",
    country: customer?.country || "",
  });

  useEffect(() => {
    setFormData({
      phone: customer?.phone || "",
      address: customer?.address || "",
      city: customer?.city || "",
      zipCode: customer?.zipCode || "",
      country: customer?.country || "",
    });
  }, [customer]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const shippingInfoChanged =
        formData.phone !== customer?.phone ||
        formData.address !== customer?.address ||
        formData.city !== customer?.city ||
        formData.zipCode !== customer?.zipCode ||
        formData.country !== customer?.country;

      if (shippingInfoChanged && customer?.id) {
        await updateCustomerService({
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country,
        });
      }

      await checkoutService();
      clearCart();
      router.push("/customer/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      toast("Checkout Failed");
    } finally {
      setIsLoading(false);
      toast("Checkout Successful");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button className="mt-4" onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="phone" className="mb-1">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address" className="mb-1">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="mb-1">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="mb-1">
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="mb-1">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
              <div className="space-y-4">
                <div className="rounded border p-4">
                  <Label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked />
                    Credit Card
                  </Label>
                </div>
                <div className="rounded border p-4">
                  <Label className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    PayPal
                  </Label>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Complete Order"}
            </Button>
          </form>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
